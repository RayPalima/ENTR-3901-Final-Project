"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const PREFERRED_LOCATIONS = [
  // Canada
  "Toronto, ON",
  "Montréal, QC",
  "Vancouver, BC",
  "Calgary, AB",
  "Edmonton, AB",
  "Ottawa, ON",
  "Winnipeg, MB",
  "Québec City, QC",
  "Hamilton, ON",
  "Kitchener–Waterloo, ON",
  // United States
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
];

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement | null>(null);

  const matchingLocations = preferredLocation
    ? PREFERRED_LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(preferredLocation.toLowerCase()),
      )
    : PREFERRED_LOCATIONS;

  useEffect(() => {
    if (!showLocationDropdown) return;

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target;
      if (!target) return;
      if (!locationDropdownRef.current) return;
      if (!(target instanceof Node)) return;
      if (!locationDropdownRef.current.contains(target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [showLocationDropdown]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (!PREFERRED_LOCATIONS.includes(preferredLocation)) {
      setError(
        "Choose a home base from the suggestions list (top cities in Canada and the US).",
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          preferred_location: preferredLocation,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight font-[family-name:var(--font-headline)] mb-4">
            Check your email
          </h2>
          <p className="text-on-surface-variant text-base mb-8 leading-relaxed">
            We&apos;ve sent a confirmation link to{" "}
            <span className="font-bold text-on-surface">{email}</span>. Click
            the link to verify your account, then sign in.
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all font-[family-name:var(--font-headline)]"
          >
            Go to Sign In <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-tertiary-container relative flex-col justify-between p-12">
        <div>
          <h1 className="text-3xl font-extrabold text-on-tertiary-container tracking-tight font-[family-name:var(--font-headline)]">
            Homestead
          </h1>
          <p className="text-on-tertiary-container/60 text-xs uppercase tracking-widest font-bold mt-1">
            Digital Sanctuary
          </p>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-extrabold text-on-tertiary-container leading-tight font-[family-name:var(--font-headline)] mb-6">
            Your property journey starts here.
          </h2>
          <p className="text-on-tertiary-container/70 text-lg leading-relaxed">
            Create your free account to unlock AI-powered property evaluations,
            smart shortlists, and investment insights tailored to your goals.
          </p>
        </div>

        <div className="space-y-4">
          {[
            "AI-driven property matching",
            "Risk & financial analysis agents",
            "Personalized investment settings",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-on-tertiary-container/20 flex items-center justify-center">
                <CheckCircle
                  size={14}
                  className="text-on-tertiary-container"
                />
              </div>
              <p className="text-on-tertiary-container/80 text-sm font-medium">
                {feature}
              </p>
            </div>
          ))}
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
              Create account
            </h2>
            <p className="text-on-surface-variant mt-2">
              Set up your profile to get personalized recommendations.
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

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 font-[family-name:var(--font-headline)]">
                Full name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Sarah Jenkins"
                  required
                  className="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 font-[family-name:var(--font-headline)]">
                Preferred home base (city, state or region)
              </label>
              <div className="relative" ref={locationDropdownRef}>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  />
                  <input
                    type="text"
                    value={preferredLocation}
                    onFocus={() => setShowLocationDropdown(true)}
                    onChange={(e) => {
                      setPreferredLocation(e.target.value);
                      setShowLocationDropdown(true);
                    }}
                    placeholder="Start typing, then choose a city..."
                    required
                    className="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30 transition-all font-medium"
                  />
                </div>
                {showLocationDropdown && matchingLocations.length > 0 && (
                  <div className="absolute z-20 mt-2 w-full max-h-44 overflow-y-auto rounded-2xl bg-surface-container-highest border border-outline-variant/40 shadow-lg text-left">
                    {matchingLocations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setPreferredLocation(loc);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high transition-colors text-left"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

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
                  placeholder="At least 6 characters"
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
              <p className="text-xs text-on-surface-variant/60 mt-2 ml-1">
                Must be at least 6 characters
              </p>
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
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-on-surface-variant text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                Sign in <ArrowRight size={14} />
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
