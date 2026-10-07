"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { BlogGrid } from "./blog-grid";

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

// Client-side searchable list: filters posts by title and description.
export function BlogSearchableGrid({
  posts,
  searchPlaceholder,
  emptyLabel,
}: BlogSearchableGridProps) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.description].join(" ").toLowerCase().includes(q)
    );
  }, [posts, query]);

  return (
    <div className="flex flex-col gap-6">
      <BlogSearch
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
      />
      {filtered.length > 0 ? (
        <BlogGrid posts={filtered} />
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}
