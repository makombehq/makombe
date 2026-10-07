import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

export function Cta() {
  const t = useTranslations("Cta");

  return (
    <section
      id="cta"
      className="flex w-full justify-center px-6 pb-24 sm:pb-32"
    >
      <Card className="w-full max-w-3xl bg-primary p-0">
        <div className="flex h-40 w-full items-center justify-center text-2xl font-semibold text-primary-foreground">
          {t("explore")}
        </div>
      </Card>
    </section>
  );
}
