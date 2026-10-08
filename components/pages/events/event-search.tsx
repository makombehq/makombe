"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { Event } from "@/lib/events";
import { EventGrid } from "./event-grid";
import { EventList } from "./event-list";
import {
  EventToolbar,
  type SortOrder,
  type ViewMode,
} from "./event-toolbar";

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

function sortDateValue(event: Event): string {
  return event.startDate ?? "";
}

// Toolbar (sort, filter, view, search) over the fetched events.
export function EventSearchableGrid({
  events,
  searchPlaceholder,
  emptyLabel,
}: EventSearchableGridProps) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<SortOrder>("latest");
  const [view, setView] = React.useState<ViewMode>("grid");

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? events.filter((e) =>
          [e.title, e.description, e.location ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(q)
        )
      : events.slice();

    filtered.sort((a, b) => {
      switch (sort) {
        case "latest":
          return sortDateValue(b).localeCompare(sortDateValue(a));
        case "oldest":
          return sortDateValue(a).localeCompare(sortDateValue(b));
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
      }
    });

    return filtered;
  }, [events, query, sort]);

  return (
    <div className="flex flex-col gap-6">
      <EventToolbar
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
          <EventGrid events={visible} />
        ) : (
          <EventList events={visible} />
        )
      ) : (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      )}
    </div>
  );
}
