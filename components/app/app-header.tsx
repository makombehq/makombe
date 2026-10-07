import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/app/logomark.png"
            alt="makombe logo"
            width={28}
            height={28}
            className="size-7"
            priority
          />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            makombe
          </span>
        </Link>
      </div>
    </header>
  );
}
