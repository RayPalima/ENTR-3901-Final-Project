"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  Settings,
  User,
  PlusCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Search", href: "/browse", icon: Search },
  { label: "Saved Shortlists", href: "/shortlists", icon: Bookmark },
  { label: "Investment Settings", href: "/settings", icon: Settings },
  { label: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <aside className="hidden md:flex bg-surface-container-low h-screen w-72 fixed left-0 top-0 rounded-r-[3rem] flex-col py-8 z-50">
      <div className="px-8 mb-10">
        <h1 className="text-xl font-extrabold text-primary tracking-tight font-[family-name:var(--font-headline)]">
          Homestead
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-primary-container font-bold opacity-70">
          Digital Sanctuary
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-4 py-3 px-6 flex items-center gap-4 rounded-full transition-all font-[family-name:var(--font-headline)] font-medium text-sm ${
                isActive
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "text-primary-container hover:bg-surface-container-highest"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-8 mt-auto pt-8 border-t border-outline-variant/10">
        <div className="bg-tertiary-container/10 p-6 rounded-2xl mb-8">
          <p className="text-xs font-bold text-tertiary-fixed-dim uppercase tracking-tighter mb-2">
            Market Insight
          </p>
          <p className="text-primary font-bold text-xs leading-relaxed mb-4">
            Kensington property values have risen by 4.2% this quarter.
          </p>
          <button className="w-full py-2.5 px-4 bg-primary text-on-primary rounded-full text-xs font-bold transition-transform active:scale-95">
            View Details
          </button>
        </div>
        <div className="space-y-1">
          <button className="text-primary-container w-full py-2 px-4 flex items-center gap-3 hover:bg-surface-container-highest rounded-full transition-all text-sm">
            <HelpCircle size={18} />
            Support
          </button>
          <button
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
            className="text-error w-full py-2 px-4 flex items-center gap-3 hover:bg-error-container/50 rounded-full transition-all text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
