// Data access for the Blog section.
// Reads markdown files from content/blog/<category>/<slug>.md.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  /** Category directory name, e.g. "company", "research", "product". */
  category: string;
  /** Short summary shown on cards and listings. */
  description: string;
  /** Author name. */
  author: string;
  /** ISO publish date (YYYY-MM-DD), if provided. */
  date: string | null;
  /** Estimated reading time in minutes (from the body). */
  readingTime: number;
};

export type BlogPostDetail = BlogPost & {
  /** Rendered HTML body of the markdown document. */
  contentHtml: string;
};

const DEFAULT_AUTHOR = "Hrudu Shibu";

// Rough reading time: ~200 words per minute, minimum 1.
function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

// Derive a human-readable title from a slug as a fallback.
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Extract a title: frontmatter `title`, else the first `# ` heading, else slug.
function resolveTitle(
  slug: string,
  data: Record<string, unknown>,
  body: string
): string {
  if (typeof data.title === "string" && data.title.trim()) {
    return data.title.trim();
  }
  const heading = body.match(/^#\s+(.+)$/m);
  if (heading) {
    return heading[1].trim();
  }
  return slugToTitle(slug);
}

type MarkdownFile = {
  category: string;
  slug: string;
  filePath: string;
};

// Walk content/blog/<category>/*.md and collect file descriptors.
async function listMarkdownFiles(): Promise<MarkdownFile[]> {
  const files: MarkdownFile[] = [];

  let categories: string[];
  try {
    categories = (await fs.readdir(BLOG_DIR, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
      .map((d) => d.name);
  } catch {
    return files;
  }

  for (const category of categories) {
    const categoryDir = path.join(BLOG_DIR, category);
    // Skip template/draft files prefixed with "_" (e.g. _template.md).
    const entries = (await fs.readdir(categoryDir, { withFileTypes: true }))
      .filter(
        (d) => d.isFile() && d.name.endsWith(".md") && !d.name.startsWith("_")
      )
      .map((d) => d.name);

    for (const entry of entries) {
      files.push({
        category,
        slug: entry.replace(/\.md$/, ""),
        filePath: path.join(categoryDir, entry),
      });
    }
  }

  return files;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  const files = await listMarkdownFiles();

  const parsed = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file.filePath, "utf8");
      const { data, content } = matter(raw);
      return {
        draft: data.draft === true,
        date: str(data.date),
        post: {
          slug: file.slug,
          title: resolveTitle(file.slug, data, content),
          category: file.category,
          description: str(data.description) ?? "",
          author: str(data.author) ?? DEFAULT_AUTHOR,
          date: str(data.date),
          readingTime: readingTimeMinutes(content),
        } satisfies BlogPost,
      };
    })
  );

  // Drop drafts, then sort newest first by date (falling back to title).
  return parsed
    .filter((p) => !p.draft)
    .sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.post.title.localeCompare(b.post.title);
    })
    .map((p) => p.post);
}

export async function getBlogPost(
  slug: string
): Promise<BlogPostDetail | null> {
  "use cache";
  const files = await listMarkdownFiles();
  const file = files.find((f) => f.slug === slug);
  if (!file) return null;

  const raw = await fs.readFile(file.filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);

  return {
    slug: file.slug,
    title: resolveTitle(file.slug, data, content),
    category: file.category,
    description: str(data.description) ?? "",
    author: str(data.author) ?? DEFAULT_AUTHOR,
    date: str(data.date),
    readingTime: readingTimeMinutes(content),
    contentHtml: processed.toString(),
  };
}
