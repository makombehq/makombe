import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="hero"
      className="flex w-full flex-1 items-center justify-center px-6 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-primary text-balance sm:text-5xl">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>
      </div>
    </section>
  );
}
