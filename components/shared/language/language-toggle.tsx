"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ml: "മ",
};

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Toggle between the configured locales (en <-> ml).
  function toggle() {
    const nextLocale =
      routing.locales[
        (routing.locales.indexOf(locale) + 1) % routing.locales.length
      ];

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggle}
      disabled={isPending}
      aria-label="Toggle language"
    >
      <span>{LOCALE_LABELS[locale]}</span>
    </Button>
  );
}
