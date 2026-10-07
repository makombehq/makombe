import { ThemeToggle } from "@/components/shared/theme/theme-toggle";
import { LanguageToggle } from "@/components/shared/language/language-toggle";

export function AppTopbar() {
  return (
    <header className="w-full border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-end px-6">
        {/* Theme + language toggles */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
