import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales supported by the application
  locales: ["en", "ml"],

  // The default locale used when no locale matches
  defaultLocale: "en",

  // Only prefix non-default locales (e.g. /ml). The default locale (English)
  // is served at the root without a prefix (e.g. / instead of /en), and
  // "/en" is redirected to "/" by the proxy.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
