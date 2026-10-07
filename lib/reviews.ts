// Data access for the Reviews section.
// Reads markdown files from content/reviews/<year>/<month>/<slug>.md.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const REVIEWS_DIR = path.join(process.cwd(), "content", "reviews");

export type Review = {
  slug: string;
  title: string;
  year: string;
  /** Directory name, e.g. "10-october". */
  month: string;
};

export type ReviewDetail = Review & {
  /** Rendered HTML body of the markdown document. */
  contentHtml: string;
};

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

// Walk content/reviews/<year>/<month>/*.md and collect file descriptors.
async function listMarkdownFiles(): Promise<MarkdownFile[]> {
  const files: MarkdownFile[] = [];

  let years: string[];
  try {
    years = (await fs.readdir(REVIEWS_DIR, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
      .map((d) => d.name);
  } catch {
    return files;
  }

  for (const year of years) {
    const yearDir = path.join(REVIEWS_DIR, year);
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

export async function getReviews(): Promise<Review[]> {
  "use cache";
  const files = await listMarkdownFiles();

  const parsed = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file.filePath, "utf8");
      const { data, content } = matter(raw);
      return {
        draft: data.draft === true,
        review: {
          slug: file.slug,
          title: resolveTitle(file.slug, data, content),
          year: file.year,
          month: file.month,
        } satisfies Review,
      };
    })
  );

  // Drop drafts, then sort newest first by year then month directory name.
  return parsed
    .filter((p) => !p.draft)
    .map((p) => p.review)
    .sort(
      (a, b) => b.year.localeCompare(a.year) || b.month.localeCompare(a.month)
    );
}

export async function getReview(slug: string): Promise<ReviewDetail | null> {
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
    contentHtml: processed.toString(),
  };
}
