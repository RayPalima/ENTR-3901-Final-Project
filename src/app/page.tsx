"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Ruler,
  ChevronRight,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { PublicTopBar } from "@/components/public-top-bar";

const suggestions = [
  "Quiet cottage near water",
  "Modern loft for a chef",
  "Sunny terrace garden",
];

const properties = [
  {
    name: "The Obsidian Glasshouse",
    price: "$1,450,000",
    location: "Laurel Canyon, LA",
    badge: "98% Match",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    insight:
      "\"This home's floor-to-ceiling glazing and canyon views align perfectly with your preference for natural light and indoor-outdoor flow.\"",
  },
  {
    name: "Elderberry Cottage",
    price: "$820,000",
    location: "Cotswolds, UK",
    badge: "Highly Viewed",
    beds: 3,
    baths: 2,
    sqft: "1,800",
    insight:
      "\"A storybook retreat with hand-laid stone walls and wildflower gardens — ideal for the quiet, rural life you described.\"",
  },
  {
    name: "Skyline Loft 4B",
    price: "$1,100,000",
    location: "Austin, TX",
    badge: "Investment Pick",
    beds: 2,
    baths: 2,
    sqft: "1,650",
    insight:
      "\"Strong rental yield in a booming market. The open-plan kitchen suits your entertaining style.\"",
  },
  {
    name: "Blue Pine Retreat",
    price: "$950,000",
    location: "Tahoe, CA",
    badge: "Quiet Oasis",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    insight:
      "\"Nestled among blue pines with lake access — a sanctuary for deep work and weekend escapes.\"",
  },
  {
    name: "Saguaro Sands",
    price: "$1,250,000",
    location: "Sedona, AZ",
    badge: "Unique Find",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    insight:
      "\"Desert modernism with red-rock panoramas. The private courtyard matches your love of stargazing.\"",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function PropertyCard({
  property,
  featured = false,
}: {
  property: (typeof properties)[0];
  featured?: boolean;
}) {
  const isBadgeMatch = property.badge.includes("%");

  return (
    <motion.div
      variants={cardVariants}
      className={`group bg-surface-container-low rounded-2xl overflow-hidden editorial-shadow transition-all hover:-translate-y-1 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : "flex flex-col"
      }`}
    >
      <div
        className={`relative bg-surface-container-highest ${
          featured ? "min-h-[280px]" : "h-52"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
            <MapPin className="text-primary-container" size={28} />
          </div>
        </div>
        <span
          className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${
            isBadgeMatch
              ? "bg-primary text-on-primary"
              : "bg-tertiary-container text-on-tertiary-container"
          }`}
        >
          {property.badge}
        </span>
      </div>

      <div
        className={`p-6 flex flex-col gap-3 ${featured ? "justify-center" : ""}`}
      >
        <div>
          <h3 className="font-[family-name:var(--font-headline)] font-extrabold text-lg text-primary leading-tight">
            {property.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant">
            <MapPin size={14} />
            <span className="text-sm">{property.location}</span>
          </div>
        </div>

        <p className="font-[family-name:var(--font-headline)] text-2xl font-extrabold text-on-surface">
          {property.price}
        </p>

        <div className="flex items-center gap-4 text-on-surface-variant text-sm">
          <span className="flex items-center gap-1">
            <Bed size={15} /> {property.beds} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath size={15} /> {property.baths} Bath
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={15} /> {property.sqft} sqft
          </span>
        </div>

        <div className="bg-primary-fixed/30 rounded-xl p-4 mt-1">
          <p className="text-[11px] uppercase tracking-widest font-bold text-primary-container mb-1.5 flex items-center gap-1.5">
            <Sparkles size={12} /> AI Agent Insight
          </p>
          <p className="text-sm italic text-on-surface-variant leading-relaxed">
            {property.insight}
          </p>
        </div>

        <button className="mt-2 flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
          View Property <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  useAuth();
  const router = useRouter();

  const goToBrowse = () => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/browse?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <PublicTopBar />

      <div className="pt-20 px-6 pb-20">
        {/* Hero Search */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto py-20 text-center"
        >
          <h1 className="font-[family-name:var(--font-headline)] text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
            Find your sanctuary.
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-10">
            Our AI agent understands the feeling of home, not just the square
            footage.
          </p>

          <div className="bg-surface-container-highest rounded-3xl p-2 flex items-center gap-2 editorial-shadow max-w-2xl mx-auto">
            <div className="pl-4 text-primary-container">
              <Sparkles size={22} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToBrowse();
              }}
              placeholder="Describe your ideal home..."
              className="flex-1 bg-transparent py-4 px-2 text-on-surface placeholder:text-on-surface-variant/60 outline-none text-base"
            />
            <button
              onClick={goToBrowse}
              className="bg-primary text-on-primary rounded-2xl px-6 py-3.5 font-bold text-sm flex items-center gap-2 transition-transform active:scale-95 shrink-0"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="bg-surface-container rounded-full px-5 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Top 5 Recommendations */}
        <section className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-[11px] uppercase tracking-widest font-bold text-tertiary-fixed-dim">
              Curated Discovery
            </span>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl font-extrabold text-on-surface mt-1">
              Top 5 for You
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {properties.map((property, i) => (
              <PropertyCard
                key={property.name}
                property={property}
                featured={i === 0}
              />
            ))}
          </motion.div>
        </section>

        {/* CTA Banner */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <div className="bg-tertiary-container rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl md:text-4xl font-extrabold text-on-tertiary-container leading-tight">
                Start your journey home.
              </h2>
              <p className="text-on-tertiary-container/70 mt-2 text-base max-w-md">
                Create an account to unlock AI-powered property evaluations,
                saved shortlists, and personalized investment insights.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/signup"
                className="bg-on-tertiary-container text-tertiary-container rounded-full px-8 py-3.5 font-bold text-sm flex items-center gap-2 transition-transform active:scale-95"
              >
                Get Started <ArrowRight size={16} />
              </Link>
              <Link
                href="/signin"
                className="text-on-tertiary-container font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              >
                Sign in <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
