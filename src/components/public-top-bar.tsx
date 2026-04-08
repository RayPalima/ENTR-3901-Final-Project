"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function PublicTopBar() {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-surface/70 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 z-50">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-extrabold text-primary tracking-tight font-[family-name:var(--font-headline)]">
          Homestead
        </h1>
        <span className="hidden sm:inline text-[10px] uppercase tracking-widest text-primary-container font-bold opacity-70">
          Digital Sanctuary
        </span>
      </div>

      <div className="flex items-center gap-3">
        {!loading && !user && (
          <>
            <Link
              href="/signin"
              className="text-primary font-bold text-sm flex items-center gap-2 hover:opacity-80 transition-opacity font-[family-name:var(--font-headline)]"
            >
              <LogIn size={16} />
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-95 active:scale-95 transition-all font-[family-name:var(--font-headline)]"
            >
              <UserPlus size={16} />
              Get Started
            </Link>
          </>
        )}

        {!loading && user && (
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-95 active:scale-95 transition-all font-[family-name:var(--font-headline)]"
          >
            Go to Dashboard <ArrowRight size={16} />
          </button>
        )}
      </div>
    </header>
  );
}

