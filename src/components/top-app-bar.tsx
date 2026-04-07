"use client";

import { Plus } from "lucide-react";
import { useAuth } from "@/context/auth-context";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TopAppBar() {
  const { user } = useAuth();

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = getInitials(displayName);

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] h-20 bg-surface/70 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 z-40">
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6 font-[family-name:var(--font-headline)]">
          <span className="text-primary font-bold border-b-2 border-primary py-1">
            Overview
          </span>
          <span className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer">
            Comparables
          </span>
          <span className="text-on-surface-variant font-medium hover:text-primary transition-colors cursor-pointer">
            Projections
          </span>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 font-[family-name:var(--font-headline)]">
          <Plus size={16} />
          Quick Add Property
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-on-surface font-[family-name:var(--font-headline)] font-bold text-sm">
              {displayName}
            </p>
            <p className="text-on-surface/60 text-xs">{user?.email || ""}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary font-bold border-2 border-white text-sm">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
