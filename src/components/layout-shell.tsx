"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { TopAppBar } from "@/components/top-app-bar";

const PUBLIC_ROUTES = ["/", "/signin", "/signup"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <TopAppBar />
      <main className="md:ml-72 pt-20 min-h-screen">{children}</main>
    </>
  );
}
