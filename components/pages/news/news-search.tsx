"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { NewsGrid } from "./news-grid";
import { NewsList } from "./news-list";
import {
  NewsToolbar,
  type SortOrder,
  type ViewMode,
} from "./news-toolbar";

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

export function NewsSearchableGrid({
  articles,
  searchPlaceholder,
  emptyLabel,
}: NewsSearchableGridProps) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortOrder>("latest");
  const [view, setView] = React.useState<ViewMode>("grid");

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? articles.filter((a) =>
          [a.title, a.description].join(" ").toLowerCase().includes(q)
        )
      : articles.slice();

    filtered.sort((a, b) => {
      switch (sort) {
        case "latest":
          return (b.date ?? "").localeCompare(a.date ?? "");
        case "oldest":
          return (a.date ?? "").localeCompare(b.date ?? "");
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
      }
    });

    return filtered;
  }, [articles, query, sort]);

  return (
    <div className="flex flex-col gap-6">
      <NewsToolbar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
        searchPlaceholder={searchPlaceholder}
      />
      {visible.length > 0 ? (
        view === "grid" ? (
          <NewsGrid articles={visible} />
        ) : (
          <NewsList articles={visible} />
        )
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}
