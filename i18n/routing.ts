import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales supported by the application
  locales: ["en", "ml"],

  // The default locale used when no locale matches
  defaultLocale: "en",

  // Always prefix the locale in the URL (e.g. /en, /ml).
  // The root URL "/" is redirected to the default locale by the middleware.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
