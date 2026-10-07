"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { NewsGrid } from "./news-grid";

type NewsSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function NewsSearch({ value, onChange, placeholder }: NewsSearchProps) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder ?? "Search news"}
        className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

type NewsSearchableGridProps = {
  articles: NewsArticle[];
  searchPlaceholder?: string;
  emptyLabel: string;
};

// Client-side searchable list: filters articles by title and description.
export function NewsSearchableGrid({
  articles,
  searchPlaceholder,
  emptyLabel,
}: NewsSearchableGridProps) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) =>
      [a.title, a.description].join(" ").toLowerCase().includes(q)
    );
  }, [articles, query]);

  return (
    <div className="flex flex-col gap-6">
      <NewsSearch
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
      />
      {filtered.length > 0 ? (
        <NewsGrid articles={filtered} />
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}
