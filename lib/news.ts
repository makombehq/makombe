// Data access for the News section.
// Reads markdown files from content/news/<year>/<month>/<slug>.md.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export type NewsArticle = {
  slug: string;
  title: string;
  year: string;
  /** Directory name, e.g. "10-october". */
  month: string;
  /** Short summary shown on cards and listings. */
  description: string;
  /** Author name. */
  author: string;
  /** ISO publish date (YYYY-MM-DD), if provided. */
  date: string | null;
  /** Estimated reading time in minutes (from the body). */
  readingTime: number;
};

export type NewsArticleDetail = NewsArticle & {
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
  year: string;
  month: string;
  slug: string;
  filePath: string;
};

// Walk content/news/<year>/<month>/*.md and collect file descriptors.
async function listMarkdownFiles(): Promise<MarkdownFile[]> {
  const files: MarkdownFile[] = [];

  let years: string[];
  try {
    years = (await fs.readdir(NEWS_DIR, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
      .map((d) => d.name);
  } catch {
    return files;
  }

  for (const year of years) {
    const yearDir = path.join(NEWS_DIR, year);
    const months = (await fs.readdir(yearDir, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
      .map((d) => d.name);

    for (const month of months) {
      const monthDir = path.join(yearDir, month);
      // Skip template/draft files prefixed with "_" (e.g. _template.md).
      const entries = (await fs.readdir(monthDir, { withFileTypes: true }))
        .filter(
          (d) => d.isFile() && d.name.endsWith(".md") && !d.name.startsWith("_")
        )
        .map((d) => d.name);

      for (const entry of entries) {
        files.push({
          year,
          month,
          slug: entry.replace(/\.md$/, ""),
          filePath: path.join(monthDir, entry),
        });
      }
    }
  }

  return files;
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  "use cache";
  const files = await listMarkdownFiles();

  const parsed = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file.filePath, "utf8");
      const { data, content } = matter(raw);
      return {
        draft: data.draft === true,
        article: {
          slug: file.slug,
          title: resolveTitle(file.slug, data, content),
          year: file.year,
          month: file.month,
          description: str(data.description) ?? "",
          author: str(data.author) ?? DEFAULT_AUTHOR,
          date: str(data.date),
          readingTime: readingTimeMinutes(content),
        } satisfies NewsArticle,
      };
    })
  );

  // Drop drafts, then sort newest first by year then month directory name.
  return parsed
    .filter((p) => !p.draft)
    .map((p) => p.article)
    .sort(
      (a, b) => b.year.localeCompare(a.year) || b.month.localeCompare(a.month)
    );
}

export async function getNewsArticle(
  slug: string
): Promise<NewsArticleDetail | null> {
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
    year: file.year,
    month: file.month,
    description: str(data.description) ?? "",
    author: str(data.author) ?? DEFAULT_AUTHOR,
    date: str(data.date),
    readingTime: readingTimeMinutes(content),
    contentHtml: processed.toString(),
  };
}
