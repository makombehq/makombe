import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";

export default async function EventsPage({
  params,
}: PageProps<"/[locale]/events">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <AppLayout>
      <EventsContent />
    </AppLayout>
  );
}

function EventsContent() {
  const t = useTranslations("Events");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
    </div>
  );
}
