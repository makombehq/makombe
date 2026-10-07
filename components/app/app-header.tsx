"use client";

import * as React from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const t = useTranslations("Nav");
  const [open, setOpen] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);

  const links = [
    { href: "/news" as const, label: t("news") },
    { href: "/reviews" as const, label: t("reviews") },
    { href: "/events" as const, label: t("events") },
    { href: "/blog" as const, label: t("blog") },
  ];

  // Close the mobile menu on outside click/touch.
  React.useEffect(() => {
    if (!open) return;
    function handlePointer(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [open]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 w-full border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black"
    >
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/icons/app/logomark.png"
            alt="makombe logo"
            width={28}
            height={28}
            className="size-6 sm:size-7"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            makombe
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          {/* Desktop / tablet inline nav */}
          <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* GitHub repository link (theme-aware icon) */}
          <a
            href="https://github.com/makombehq/makombe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="inline-flex items-center opacity-80 transition-opacity hover:opacity-100"
          >
            <Image
              src="/icons/social/github/dark.png"
              alt="GitHub"
              width={20}
              height={20}
              className="size-5 dark:hidden"
            />
            <Image
              src="/icons/social/github/light.png"
              alt="GitHub"
              width={20}
              height={20}
              className="hidden size-5 dark:block"
            />
          </a>

          {/* Mobile menu toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="sm:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {open && (
        <nav className="border-t border-black/[.08] bg-white px-4 py-3 dark:border-white/[.145] dark:bg-black sm:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium text-muted-foreground">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 transition-colors hover:bg-muted hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
