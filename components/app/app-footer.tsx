import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Computed once at build time so the footer can be statically prerendered.
const CURRENT_YEAR = new Date().getFullYear();

export function AppFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full border-t border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:justify-between">
        <p>
          &copy; {CURRENT_YEAR} makombe. {t("rights")}
        </p>
        <nav className="flex items-center gap-4">
          <Link
            href="/legal/terms"
            className="transition-colors hover:text-primary"
          >
            {t("terms")}
          </Link>
          <Link
            href="/legal/cookies"
            className="transition-colors hover:text-primary"
          >
            {t("cookies")}
          </Link>
          <Link
            href="/legal/privacy"
            className="transition-colors hover:text-primary"
          >
            {t("privacy")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
