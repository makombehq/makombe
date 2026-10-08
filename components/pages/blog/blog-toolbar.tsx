"use client";

import * as React from "react";
import { ArrowDownUp, Filter, LayoutGrid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type SortOrder = "latest" | "oldest" | "az" | "za";
export type ViewMode = "grid" | "list";

const SORT_LABELS: Record<SortOrder, string> = {
  latest: "Latest",
  oldest: "Oldest",
  az: "A\u2013Z",
  za: "Z\u2013A",
};

const FILTER_GROUPS = ["Category", "Brand", "Product", "Type", "Tags"] as const;

type BlogToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  sort: SortOrder;
  onSortChange: (value: SortOrder) => void;
  view: ViewMode;
  onViewChange: (value: ViewMode) => void;
  searchPlaceholder?: string;
};

export function BlogToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  searchPlaceholder,
}: BlogToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button type="button" variant="outline" size="sm" />}
          >
            <ArrowDownUp className="size-4" aria-hidden />
            <span>{SORT_LABELS[sort]}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={sort}
              onValueChange={(v) => onSortChange(v as SortOrder)}
            >
              <DropdownMenuRadioItem value="latest">
                Latest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                Oldest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="az">A–Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="za">Z–A</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button type="button" variant="outline" size="sm" />}
          >
            <Filter className="size-4" aria-hidden />
            <span>Filter</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {FILTER_GROUPS.map((group) => (
              <DropdownMenuSub key={group}>
                <DropdownMenuSubTrigger>{group}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem disabled>No options yet</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <ToggleGroup
          value={[view]}
          onValueChange={(v) => {
            const next = v[0] as ViewMode | undefined;
            if (next) onViewChange(next);
          }}
          variant="outline"
          size="sm"
          spacing={0}
          aria-label="View"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="size-4" aria-hidden />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="size-4" aria-hidden />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="relative w-full sm:max-w-xs">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder ?? "Search"}
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}
