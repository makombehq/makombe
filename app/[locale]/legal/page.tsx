import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default async function LegalIndex({
  params,
}: PageProps<"/[locale]/legal">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // The legal root has no content of its own; send users to the Terms page.
  redirect({ href: "/legal/terms", locale });
}
