// Computed once at build time so the footer can be statically prerendered.
const CURRENT_YEAR = new Date().getFullYear();

export function AppFooter() {
  return (
    <footer className="w-full border-t border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-center px-6 text-sm text-zinc-600 dark:text-zinc-400">
        <p>&copy; {CURRENT_YEAR} Makombe. All rights reserved.</p>
      </div>
    </footer>
  );
}
