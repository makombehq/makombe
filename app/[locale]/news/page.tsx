import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { NewsSearchableGrid } from "@/components/pages/news";
import { getNewsArticles } from "@/lib/news";

export default async function NewsPage({
  params,
}: PageProps<"/[locale]/news">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const articles = await getNewsArticles();
  const t = await getTranslations("News");

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <div className="mt-8">
          {articles.length > 0 ? (
            <NewsSearchableGrid
              articles={articles}
              searchPlaceholder={t("search")}
              emptyLabel={t("noResults")}
            />
          ) : (
            <p className="text-sm text-muted-foreground">{t("empty")}</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
