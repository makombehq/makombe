// Data access for the Reviews section.
// Reads markdown from content/reviews/<year>/<month>/<slug>.<locale>.md.

import type { Locale } from "@/i18n/routing";
import {
  listContent,
  getContent,
  readingTimeMinutes,
  resolveTitle,
  renderMarkdown,
  str,
} from "./content";

const SECTION = "reviews";
const DEFAULT_AUTHOR = "Hrudu Shibu";

export type Review = {
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

export type ReviewDetail = Review & {
  contentHtml: string;
};

function toReview(
  slug: string,
  segments: string[],
  data: Record<string, unknown>,
  body: string
): Review {
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

export async function getReviews(locale: Locale): Promise<Review[]> {
  "use cache";
  const entries = await listContent(SECTION, locale);

  return entries
    .filter((e) => e.data.draft !== true)
    .map((e) => toReview(e.slug, e.segments, e.data, e.body))
    .sort(
      (a, b) => b.year.localeCompare(a.year) || b.month.localeCompare(a.month)
    );
}

export async function getReview(
  slug: string,
  locale: Locale
): Promise<ReviewDetail | null> {
  "use cache";
  const entry = await getContent(SECTION, slug, locale);
  if (!entry) return null;

  const review = toReview(entry.slug, entry.segments, entry.data, entry.body);
  const contentHtml = await renderMarkdown(entry.body);
  return { ...review, contentHtml };
}
