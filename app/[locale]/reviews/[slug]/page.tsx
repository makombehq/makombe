import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { ReviewRelated } from "@/components/pages/reviews";
import { getReview, getReviews } from "@/lib/reviews";

// Dynamic article routes render on demand (slug comes from the URL).
export const instant = false;

export default async function ReviewArticlePage({
  params,
}: PageProps<"/[locale]/reviews/[slug]">) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const review = await getReview(slug, locale);
  if (!review) {
    notFound();
  }

  const t = await getTranslations("Reviews");

  const all = await getReviews(locale);
  const related = all.filter((r) => r.slug !== review.slug).slice(0, 4);

  return (
    <AppLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <header className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              {review.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {[review.date, review.author, `${review.readingTime} min read`]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </header>
          <div
            className="prose prose-neutral max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: review.contentHtml }}
          />
        </article>

        <ReviewRelated reviews={related} heading={t("related")} />
      </div>
    </AppLayout>
  );
}
