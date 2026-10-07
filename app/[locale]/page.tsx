import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { Hero } from "@/components/pages/home/hero";
import { Cta } from "@/components/pages/home/cta";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <AppLayout>
      <Hero />
      <Cta />
    </AppLayout>
  );
}
