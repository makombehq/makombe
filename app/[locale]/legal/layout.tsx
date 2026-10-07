import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";

// Statically generate the legal routes for each supported locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LegalLayout({
  children,
  params,
}: LayoutProps<"/[locale]/legal">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
        <article className="flex flex-col gap-8 text-foreground">
          {children}
        </article>
      </div>
    </AppLayout>
  );
}
