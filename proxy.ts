import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`.
// This handles locale detection and redirects the root URL "/"
// to the default locale (e.g. "/en").
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals (/_next, /_vercel)
  // - static files (containing a dot)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
