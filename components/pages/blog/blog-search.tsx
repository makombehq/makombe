"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { BlogGrid } from "./blog-grid";
import { BlogList } from "./blog-list";
import {
  BlogToolbar,
  type SortOrder,
  type ViewMode,
} from "./blog-toolbar";

type BlogSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function BlogSearch({ value, onChange, placeholder }: BlogSearchProps) {
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
        placeholder={placeholder ?? "Search blog"}
        className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

type BlogSearchableGridProps = {
  posts: BlogPost[];
  searchPlaceholder?: string;
  emptyLabel: string;
};

export function BlogSearchableGrid({
  posts,
  searchPlaceholder,
  emptyLabel,
}: BlogSearchableGridProps) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortOrder>("latest");
  const [view, setView] = React.useState<ViewMode>("grid");

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? posts.filter((p) =>
          [p.title, p.description].join(" ").toLowerCase().includes(q)
        )
      : posts.slice();

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
  }, [posts, query, sort]);

  return (
    <div className="flex flex-col gap-6">
      <BlogToolbar
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
          <BlogGrid posts={visible} />
        ) : (
          <BlogList posts={visible} />
        )
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}
