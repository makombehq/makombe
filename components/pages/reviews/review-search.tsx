"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { ReviewGrid } from "./review-grid";
import { ReviewList } from "./review-list";
import {
  ReviewToolbar,
  type SortOrder,
  type ViewMode,
} from "./review-toolbar";

type ReviewSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function ReviewSearch({
  value,
  onChange,
  placeholder,
}: ReviewSearchProps) {
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
        placeholder={placeholder ?? "Search reviews"}
        className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

type ReviewSearchableGridProps = {
  reviews: Review[];
  searchPlaceholder?: string;
  emptyLabel: string;
};

export function ReviewSearchableGrid({
  reviews,
  searchPlaceholder,
  emptyLabel,
}: ReviewSearchableGridProps) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortOrder>("latest");
  const [view, setView] = React.useState<ViewMode>("grid");

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? reviews.filter((r) =>
          [r.title, r.description].join(" ").toLowerCase().includes(q)
        )
      : reviews.slice();

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
  }, [reviews, query, sort]);

  return (
    <div className="flex flex-col gap-6">
      <ReviewToolbar
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
          <ReviewGrid reviews={visible} />
        ) : (
          <ReviewList reviews={visible} />
        )
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}
