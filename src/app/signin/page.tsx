"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative flex-col justify-between p-12">
        <div>
          <h1 className="text-3xl font-extrabold text-on-primary tracking-tight font-[family-name:var(--font-headline)]">
            Homestead
          </h1>
          <p className="text-on-primary/60 text-xs uppercase tracking-widest font-bold mt-1">
            Digital Sanctuary
          </p>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-extrabold text-on-primary leading-tight font-[family-name:var(--font-headline)] mb-6">
            Welcome back to your sanctuary.
          </h2>
          <p className="text-on-primary/70 text-lg leading-relaxed">
            Your AI-powered property evaluation dashboard is waiting. Sign in to
            access your personalized insights, saved shortlists, and investment
            analytics.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {["SJ", "AC", "JT"].map((initials, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-primary-container border-2 border-primary flex items-center justify-center text-on-primary-container text-xs font-bold"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-on-primary/60 text-sm">
            Join 2,400+ investors already using Homestead
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <h1 className="text-2xl font-extrabold text-primary tracking-tight font-[family-name:var(--font-headline)]">
              Homestead
            </h1>
            <p className="text-primary-container text-xs uppercase tracking-widest font-bold mt-1">
              Digital Sanctuary
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight font-[family-name:var(--font-headline)]">
              Sign in
            </h2>
            <p className="text-on-surface-variant mt-2">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-error-container text-on-error-container rounded-2xl p-4 mb-6 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 font-[family-name:var(--font-headline)]">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 font-[family-name:var(--font-headline)]">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-12 pr-12 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-4 rounded-full font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed font-[family-name:var(--font-headline)]"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-on-surface-variant text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                Create one <ArrowRight size={14} />
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-on-surface-variant text-sm hover:text-primary transition-colors"
            >
              &larr; Back to browsing
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
