"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/shared/theme/theme-toggle";
import { LanguageToggle } from "@/components/shared/language/language-toggle";

type OpenMenu = "theme" | "language" | null;

export function AppTopbar() {
  const t = useTranslations("Topbar");
  const [openMenu, setOpenMenu] = React.useState<OpenMenu>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close the open popup when clicking/touching outside the toggle group.
  React.useEffect(() => {
    if (openMenu === null) return;

    function handlePointer(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [openMenu]);

  return (
    <header className="relative z-50 w-full border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex h-8 w-full max-w-3xl items-center justify-end px-4 sm:px-6">
        {/* Theme + language toggles: only one open at a time */}
        <div ref={containerRef} className="flex items-center gap-0">
          <ThemeToggle
            open={openMenu === "theme"}
            onOpenChange={(open) => setOpenMenu(open ? "theme" : null)}
          />
          <LanguageToggle
            open={openMenu === "language"}
            onOpenChange={(open) => setOpenMenu(open ? "language" : null)}
          />
          <a
            href="https://github.com/makombehq/makombe/discussions/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-[0.8rem] font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            {t("feedback")}
          </a>
          <a
            href="https://github.com/makombehq/makombe/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-[0.8rem] font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            {t("support")}
          </a>
        </div>
      </div>
    </header>
  );
}
