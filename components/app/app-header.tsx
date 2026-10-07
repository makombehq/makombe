import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AppHeader() {
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/app/logomark.png"
            alt="makombe logo"
            width={28}
            height={28}
            className="size-7"
            priority
          />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            makombe
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-muted-foreground">
          <Link
            href="/news"
            className="transition-colors hover:text-primary"
          >
            {t("news")}
          </Link>
          <Link
            href="/reviews"
            className="transition-colors hover:text-primary"
          >
            {t("reviews")}
          </Link>
          <Link
            href="/events"
            className="transition-colors hover:text-primary"
          >
            {t("events")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
