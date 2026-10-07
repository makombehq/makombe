import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppLayout } from "@/components/app/app-layout";
import { EventRelated } from "@/components/pages/events";
import { getEvent, getEvents } from "@/lib/events";

// Dynamic article routes render on demand (slug comes from the URL).
export const instant = false;

export default async function EventArticlePage({
  params,
}: PageProps<"/[locale]/events/[slug]">) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const event = await getEvent(slug);
  if (!event) {
    notFound();
  }

  const t = await getTranslations("Events");

  // Up to 3 other events as "related".
  const all = await getEvents();
  const related = all.filter((e) => e.slug !== event.slug).slice(0, 3);

  const meta = [event.startDate, event.location].filter(Boolean).join("  ·  ");

  return (
    <AppLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <header className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              {event.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {[meta, event.author, `${event.readingTime} min read`]
                .filter(Boolean)
                .join("  ·  ")}
            </p>
          </header>
          <div
            className="prose prose-neutral max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: event.contentHtml }}
          />
        </article>

        <EventRelated events={related} heading={t("related")} />
      </div>
    </AppLayout>
  );
}
