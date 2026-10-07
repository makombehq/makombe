import type { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppTopbar } from "./app-topbar";
import { AppFooter } from "./app-footer";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppTopbar />
      <AppHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <AppFooter />
    </div>
  );
}
