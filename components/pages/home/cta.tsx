import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

export function Cta() {
  const t = useTranslations("Cta");

  return (
    <section
      id="cta"
      className="flex w-full justify-center px-4 pb-16 sm:px-6 sm:pb-24 lg:pb-32"
    >
      <Card className="w-full max-w-3xl bg-primary p-0">
        <div className="flex h-28 w-full items-center justify-center text-xl font-semibold text-primary-foreground sm:h-40 sm:text-2xl">
          {t("explore")}
        </div>
      </Card>
    </section>
  );
}
