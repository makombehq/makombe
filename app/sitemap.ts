import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getNewsArticles } from "@/lib/news";
import { getReviews } from "@/lib/reviews";
import { getEvents } from "@/lib/events";
import { getBlogPosts } from "@/lib/blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://makombe.app";

// Build a locale-aware absolute URL honoring the "as-needed" prefix:
// the default locale is served at the root, others under "/<locale>".
function localeUrl(locale: string, pathname: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const path = pathname === "/" ? "" : pathname;
  return `${BASE_URL}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Slugs are canonical and shared across locales; enumerate with the
  // default locale. (events and blog don't take a locale yet.)
  const [news, reviews, events, posts] = await Promise.all([
    getNewsArticles(routing.defaultLocale),
    getReviews(routing.defaultLocale),
    getEvents(),
    getBlogPosts(),
  ]);

  // Static pages present for every locale.
  const staticPaths = [
    "/",
    "/news",
    "/reviews",
    "/events",
    "/blog",
    "/legal/terms",
    "/legal/cookies",
    "/legal/privacy",
  ];

  // Dynamic content detail pages.
  const dynamicPaths = [
    ...news.map((a) => `/news/${a.slug}`),
    ...reviews.map((r) => `/reviews/${r.slug}`),
    ...events.map((e) => `/events/${e.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];
  for (const pathname of allPaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: localeUrl(locale, pathname),
        lastModified: now,
        changeFrequency: pathname === "/" ? "daily" : "weekly",
        priority: pathname === "/" ? 1 : 0.7,
      });
    }
  }

  return entries;
}
