// Shared locale-aware Markdown content loader.
//
// Convention: files live under content/<section>/<...path>/<slug>.<locale>.md
// (e.g. 2026/10-october/intro.en.md). The canonical slug is the filename with
// the ".<locale>.md" (or legacy ".md") suffix removed and is shared across
// locales. A requested locale resolves to its own file, falling back to the
// default locale when a translation is missing.
//
// Files or directories prefixed with "_" (e.g. _template.en.md) are ignored.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { routing, type Locale } from "@/i18n/routing";

export type ContentEntry = {
  slug: string;
  /** Relative directory segments from the section root, e.g. ["2026", "10-october"]. */
  segments: string[];
  data: Record<string, unknown>;
  body: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

const LOCALE_SET = new Set<string>(routing.locales);

// Parse "<slug>.<locale>.md" / "<slug>.md" into { slug, locale|null }.
function parseFileName(name: string): { slug: string; locale: string | null } {
  const withoutExt = name.replace(/\.md$/, "");
  const dot = withoutExt.lastIndexOf(".");
  if (dot !== -1) {
    const maybeLocale = withoutExt.slice(dot + 1);
    if (LOCALE_SET.has(maybeLocale)) {
      return { slug: withoutExt.slice(0, dot), locale: maybeLocale };
    }
  }
  // No locale suffix: treat as the default locale.
  return { slug: withoutExt, locale: null };
}

type RawFile = {
  slug: string;
  locale: string; // resolved: explicit suffix or default locale
  segments: string[];
  filePath: string;
};

// Recursively walk a section directory collecting markdown files.
async function walk(
  dir: string,
  segments: string[],
  out: RawFile[]
): Promise<void> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, [...segments, entry.name], out);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const { slug, locale } = parseFileName(entry.name);
      out.push({
        slug,
        locale: locale ?? routing.defaultLocale,
        segments,
        filePath: full,
      });
    }
  }
}

// All canonical entries for a section in the requested locale, with fallback
// to the default locale per slug when a translation is missing.
export async function listContent(
  section: string,
  locale: Locale
): Promise<ContentEntry[]> {
  const files: RawFile[] = [];
  await walk(path.join(CONTENT_ROOT, section), [], files);

  // Group by canonical slug, keyed by locale.
  const bySlug = new Map<string, Map<string, RawFile>>();
  for (const file of files) {
    let locales = bySlug.get(file.slug);
    if (!locales) {
      locales = new Map();
      bySlug.set(file.slug, locales);
    }
    locales.set(file.locale, file);
  }

  const entries: ContentEntry[] = [];
  for (const locales of bySlug.values()) {
    const chosen = locales.get(locale) ?? locales.get(routing.defaultLocale);
    if (!chosen) continue;
    const raw = await fs.readFile(chosen.filePath, "utf8");
    const { data, content } = matter(raw);
    entries.push({
      slug: chosen.slug,
      segments: chosen.segments,
      data,
      body: content,
    });
  }

  return entries;
}

// A single canonical entry by slug in the requested locale, with fallback.
export async function getContent(
  section: string,
  slug: string,
  locale: Locale
): Promise<ContentEntry | null> {
  const files: RawFile[] = [];
  await walk(path.join(CONTENT_ROOT, section), [], files);

  const matches = files.filter((f) => f.slug === slug);
  if (matches.length === 0) return null;

  const chosen =
    matches.find((f) => f.locale === locale) ??
    matches.find((f) => f.locale === routing.defaultLocale) ??
    matches[0];

  const raw = await fs.readFile(chosen.filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug: chosen.slug,
    segments: chosen.segments,
    data,
    body: content,
  };
}

// Shared helpers reused by section libs.

export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function resolveTitle(
  slug: string,
  data: Record<string, unknown>,
  body: string
): string {
  const fromData = str(data.title);
  if (fromData) return fromData;
  const heading = body.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return slugToTitle(slug);
}

export async function renderMarkdown(body: string): Promise<string> {
  const processed = await remark().use(html).process(body);
  return processed.toString();
}
