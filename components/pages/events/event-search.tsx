"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { Event } from "@/lib/events";
import { EventGrid } from "./event-grid";

type EventSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function EventSearch({
  value,
  onChange,
  placeholder,
}: EventSearchProps) {
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
        placeholder={placeholder ?? "Search events"}
        className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

type EventSearchableGridProps = {
  events: Event[];
  searchPlaceholder?: string;
  emptyLabel: string;
};

// Client-side searchable list: a search box over the fetched events,
// filtering by title, description, and location.
export function EventSearchableGrid({
  events,
  searchPlaceholder,
  emptyLabel,
}: EventSearchableGridProps) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) =>
      [e.title, e.description, e.location ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [events, query]);

  return (
    <div className="flex flex-col gap-6">
      <EventSearch
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
      />
      {filtered.length > 0 ? (
        <EventGrid events={filtered} />
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}
