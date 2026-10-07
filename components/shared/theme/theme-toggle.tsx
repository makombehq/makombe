"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

type ThemeToggleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ThemeToggle({ open, onOpenChange }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch: theme is only known on the client.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  function select(value: string) {
    onOpenChange(false);
    setTheme(value);
  }

  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className="relative">
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="link"
            size="sm"
            aria-label="Theme"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary aria-expanded:text-primary"
          />
        }
      >
        <span>Theme</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute right-0 top-full z-50 mt-2 min-w-32 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md">
        {THEME_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => select(opt.value)}
            data-active={mounted && theme === opt.value}
            className="flex w-full items-center rounded-md px-2.5 py-1.5 text-sm hover:bg-muted data-[active=true]:font-medium"
          >
            {opt.label}
          </button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
