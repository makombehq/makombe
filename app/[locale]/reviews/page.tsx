import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { ReviewGrid } from "@/components/pages/reviews";
import { getReviews } from "@/lib/reviews";

export default async function ReviewsPage({
  params,
}: PageProps<"/[locale]/reviews">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const reviews = await getReviews();

  return (
    <AppLayout>
      <ReviewsContent reviewCount={reviews.length}>
        <ReviewGrid reviews={reviews} />
      </ReviewsContent>
    </AppLayout>
  );
}

function ReviewsContent({
  children,
  reviewCount,
}: {
  children: React.ReactNode;
  reviewCount: number;
}) {
  const t = useTranslations("Reviews");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <div className="mt-8">
        {reviewCount > 0 ? (
          children
        ) : (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        )}
      </div>
    </div>
  );
}
