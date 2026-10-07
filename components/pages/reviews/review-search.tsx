"use client";

import * as React from "react";
import { Search } from "lucide-react";

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
