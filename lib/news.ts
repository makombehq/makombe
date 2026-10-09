// Data access for the News section.
// Reads markdown from content/news/<year>/<month>/<slug>.<locale>.md.

import type { Locale } from "@/i18n/routing";
import {
  listContent,
  getContent,
  readingTimeMinutes,
  resolveTitle,
  renderMarkdown,
  str,
} from "./content";

const SECTION = "news";
const DEFAULT_AUTHOR = "Hrudu Shibu";

export type NewsArticle = {
  slug: string;
  title: string;
  year: string;
  /** Directory name, e.g. "10-october". */
  month: string;
  description: string;
  author: string;
  date: string | null;
  readingTime: number;
};

export type NewsArticleDetail = NewsArticle & {
  contentHtml: string;
};

function toArticle(
  slug: string,
  segments: string[],
  data: Record<string, unknown>,
  body: string
): NewsArticle {
  return {
    slug,
    title: resolveTitle(slug, data, body),
    year: segments[0] ?? "",
    month: segments[1] ?? "",
    description: str(data.description) ?? "",
    author: str(data.author) ?? DEFAULT_AUTHOR,
    date: str(data.date),
    readingTime: readingTimeMinutes(body),
  };
}

export async function getNewsArticles(locale: Locale): Promise<NewsArticle[]> {
  "use cache";
  const entries = await listContent(SECTION, locale);

  return entries
    .filter((e) => e.data.draft !== true)
    .map((e) => toArticle(e.slug, e.segments, e.data, e.body))
    .sort(
      (a, b) => b.year.localeCompare(a.year) || b.month.localeCompare(a.month)
    );
}

export async function getNewsArticle(
  slug: string,
  locale: Locale
): Promise<NewsArticleDetail | null> {
  "use cache";
  const entry = await getContent(SECTION, slug, locale);
  if (!entry) return null;

  const article = toArticle(entry.slug, entry.segments, entry.data, entry.body);
  const contentHtml = await renderMarkdown(entry.body);
  return { ...article, contentHtml };
}
