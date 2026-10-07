import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { EventGrid } from "@/components/pages/events";
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

  return (
    <AppLayout>
      <EventsContent eventCount={events.length}>
        <EventGrid events={events} />
      </EventsContent>
    </AppLayout>
  );
}

function EventsContent({
  children,
  eventCount,
}: {
  children: React.ReactNode;
  eventCount: number;
}) {
  const t = useTranslations("Events");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <div className="mt-8">
        {eventCount > 0 ? (
          children
        ) : (
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        )}
      </div>
    </div>
  );
}
