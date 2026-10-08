import Image from "next/image";
import Link from "next/link";
import "./globals.css";

// Build-time constant so the footer year is deterministic.
const CURRENT_YEAR = new Date().getFullYear();

const NAV = [
  { href: "/news", label: "News" },
  { href: "/reviews", label: "Reviews" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
];

// Root not-found. Rendered outside the [locale] tree, so it is English-only
// and ships a self-contained header + footer (no topbar) without next-intl.
export default function NotFound() {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">
        <div className="flex min-h-screen flex-col">
          {/* Header (no topbar) */}
          <header className="w-full border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
            <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/icons/app/logomark.png"
                  alt="makombe logo"
                  width={28}
                  height={28}
                  className="size-6 sm:size-7"
                  priority
                />
                <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  makombe
                </span>
              </Link>
              <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground sm:flex">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          {/* 404 content */}
          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center sm:py-32">
            <p className="text-6xl font-semibold tracking-tight text-primary">
              404
            </p>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Page not found
              </h1>
              <p className="text-muted-foreground">
                The page you are looking for doesn&apos;t exist or has been
                moved.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to home
            </Link>
          </main>

          {/* Footer */}
          <footer className="w-full border-t border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-4 py-6 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:justify-between sm:px-6">
              <p>&copy; {CURRENT_YEAR} makombe. All rights reserved.</p>
              <nav className="flex items-center gap-4">
                <Link
                  href="/legal/terms"
                  className="underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Terms
                </Link>
                <Link
                  href="/legal/cookies"
                  className="underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Cookies
                </Link>
                <Link
                  href="/legal/privacy"
                  className="underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Privacy
                </Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
