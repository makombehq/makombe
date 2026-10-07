import { notFound } from "next/navigation";
import { hasLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Section = {
  heading: string;
  body: string[];
};

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/legal/privacy">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <PrivacyContent />;
}

function PrivacyContent() {
  const t = useTranslations("Legal");
  const doc = useTranslations("Legal.privacy");
  const sections = doc.raw("sections") as Section[];

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {doc("title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("lastUpdatedLabel")}: {doc("lastUpdated")}
        </p>
      </header>

      <p className="leading-7 text-muted-foreground">{doc("intro")}</p>

      {sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-3">
          <h2 className="text-xl font-medium tracking-tight">
            {section.heading}
          </h2>
          {section.body.map((paragraph, index) => (
            <p key={index} className="leading-7 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <footer className="border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {t("contactLabel")}:
          </span>{" "}
          {doc("contact")}
        </p>
      </footer>
    </>
  );
}
