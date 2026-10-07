import type { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <AppFooter />
    </div>
  );
}
