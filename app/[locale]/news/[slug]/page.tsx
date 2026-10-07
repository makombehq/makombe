import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { NewsRelated } from "@/components/pages/news";
import { getNewsArticle, getNewsArticles } from "@/lib/news";

// Dynamic article routes render on demand (slug comes from the URL).
export const instant = false;

export default async function NewsArticlePage({
  params,
}: PageProps<"/[locale]/news/[slug]">) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const article = await getNewsArticle(slug);
  if (!article) {
    notFound();
  }

  const t = await getTranslations("News");

  const all = await getNewsArticles();
  const related = all.filter((a) => a.slug !== article.slug).slice(0, 4);

  return (
    <AppLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <header className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              {article.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {[article.date, article.author, `${article.readingTime} min read`]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </header>
          <div
            className="prose prose-neutral max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>

        <NewsRelated articles={related} heading={t("related")} />
      </div>
    </AppLayout>
  );
}
