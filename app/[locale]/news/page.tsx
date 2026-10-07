import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { NewsGrid } from "@/components/pages/news";
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

  return (
    <AppLayout>
      <NewsContent articleCount={articles.length}>
        <NewsGrid articles={articles} />
      </NewsContent>
    </AppLayout>
  );
}

function NewsContent({
  children,
  articleCount,
}: {
  children: React.ReactNode;
  articleCount: number;
}) {
  const t = useTranslations("News");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <div className="mt-8">
        {articleCount > 0 ? (
          children
        ) : (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        )}
      </div>
    </div>
  );
}
