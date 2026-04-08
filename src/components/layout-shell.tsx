"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { TopAppBar } from "@/components/top-app-bar";
import { PublicTopBar } from "@/components/public-top-bar";
import { useAuth } from "@/context/auth-context";

const PUBLIC_ROUTES = ["/", "/signin", "/signup", "/browse"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  if (isPublic) {
    const showGuestTopBar =
      (pathname === "/browse" || pathname === "/") && !loading && !user;

    if (!showGuestTopBar) return <>{children}</>;

    return (
      <>
        <PublicTopBar />
        <div className="pt-20">{children}</div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <TopAppBar />
      <main className="md:ml-72 pt-20 min-h-screen">{children}</main>
    </>
  );
}
