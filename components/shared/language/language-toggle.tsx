"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  ml: "മലയാളം",
};

type LanguageToggleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LanguageToggle({ open, onOpenChange }: LanguageToggleProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function select(nextLocale: Locale) {
    onOpenChange(false);
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className="relative">
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="link"
            size="sm"
            disabled={isPending}
            aria-label="Language"
            className="text-foreground underline underline-offset-4 transition-colors hover:text-primary aria-expanded:text-primary"
          />
        }
      >
        <span>Language</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="absolute right-0 top-full z-50 mt-2 min-w-32 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md">
        {routing.locales.map((cur) => (
          <button
            key={cur}
            type="button"
            onClick={() => select(cur)}
            data-active={cur === locale}
            className="flex w-full items-center rounded-md px-2.5 py-1.5 text-sm hover:bg-muted data-[active=true]:font-medium"
          >
            {LOCALE_LABELS[cur]}
          </button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
