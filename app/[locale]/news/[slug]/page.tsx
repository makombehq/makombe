import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";

// Dynamic article routes render on demand (slug comes from the URL and there
// is no static content source yet). Allow the segment to block rather than
// requiring a prerendered shell under Cache Components.
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

  return (
    <AppLayout>
      <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground break-words sm:text-3xl lg:text-4xl">
          {slug}
        </h1>
      </article>
    </AppLayout>
  );
}
