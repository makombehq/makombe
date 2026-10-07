import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { EventSearchableGrid } from "@/components/pages/events";
import { getEvents } from "@/lib/events";

export default async function EventsPage({
  params,
}: PageProps<"/[locale]/events">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const events = await getEvents();
  const t = await getTranslations("Events");

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <div className="mt-8">
          {events.length > 0 ? (
            <EventSearchableGrid
              events={events}
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
