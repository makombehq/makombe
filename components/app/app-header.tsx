import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="w-full border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            className="dark:invert h-5 w-[100px]"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
