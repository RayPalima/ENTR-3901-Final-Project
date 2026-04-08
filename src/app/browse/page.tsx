"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const suggestions = [
  "Quiet cottage near water",
  "Modern loft for a chef",
  "Sunny terrace garden",
];

const PREFERRED_LOCATIONS = [
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

const fallbackProperties: SearchProperty[] = [
  {
    id: "fallback-1",
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
    id: "fallback-2",
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
    id: "fallback-3",
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
    id: "fallback-4",
    name: "Harborview Townhome",
    price: "$975,000",
    location: "San Diego, CA",
    badge: "Waterfront",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    insight:
      "\"Steps from the marina with rooftop ocean views — a coastal lifestyle at a competitive price point.\"",
  },
  {
    id: "fallback-5",
    name: "Maple Ridge Colonial",
    price: "$680,000",
    location: "Toronto, ON",
    badge: "Family Friendly",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    insight:
      "\"A classic family home in a top-rated school district with a spacious backyard and finished basement.\"",
  },
];

type SearchProperty = {
  id: string;
  name: string;
  price: string;
  location: string;
  badge: string;
  beds: number;
  baths: number;
  sqft: string;
  insight: string;
  image?: string;
};

type ListingsResponse = {
  parsedParams?: Record<string, unknown>;
  listings?: unknown;
  note?: string;
  error?: string;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
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
  property: SearchProperty;
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
        className={`relative bg-surface-container-highest overflow-hidden ${
          featured ? "min-h-[280px]" : "h-52"
        }`}
      >
        {property.image ? (
          <img
            src={property.image}
            alt={property.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
              <MapPin className="text-primary-container" size={28} />
            </div>
          </div>
        )}
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

      <div className={`p-6 flex flex-col gap-3 ${featured ? "justify-center" : ""}`}>
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

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [properties, setProperties] = useState<SearchProperty[]>(fallbackProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsedParams, setParsedParams] = useState<Record<string, unknown> | null>(null);
  const [noteMessage, setNoteMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const [didAutoRun, setDidAutoRun] = useState(false);
  const [preferredLocation, setPreferredLocation] = useState<string | null>(null);
  const [featuredProperties, setFeaturedProperties] = useState<SearchProperty[]>(fallbackProperties);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const [didFetchFeatured, setDidFetchFeatured] = useState(false);

  const [guestLocation, setGuestLocation] = useState("");
  const [showGuestLocationDropdown, setShowGuestLocationDropdown] = useState(false);
  const guestLocationRef = useRef<HTMLDivElement | null>(null);

  const matchingGuestLocations = guestLocation
    ? PREFERRED_LOCATIONS.filter((loc) =>
        loc.toLowerCase().includes(guestLocation.toLowerCase()),
      )
    : PREFERRED_LOCATIONS;

  useEffect(() => {
    if (!showGuestLocationDropdown) return;
    const onMouseDown = (e: MouseEvent) => {
      if (
        guestLocationRef.current &&
        e.target instanceof Node &&
        !guestLocationRef.current.contains(e.target)
      ) {
        setShowGuestLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [showGuestLocationDropdown]);

  const hasLiveResults = useMemo(
    () => properties !== fallbackProperties,
    [properties],
  );

  function firstNonEmptyString(...values: unknown[]): string | undefined {
    for (const value of values) {
      if (typeof value === "string" && value.trim().length > 0) {
        return value.trim();
      }
    }
    return undefined;
  }

  function toNumber(value: unknown): number | undefined {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const n = Number(value.replace(/[^\d.]/g, ""));
      if (Number.isFinite(n)) return n;
    }
    return undefined;
  }

  function toPrice(value: unknown, currencyHint?: unknown): string {
    const n = toNumber(value);
    if (!n) return "Price unavailable";
    const raw = typeof currencyHint === "string" ? currencyHint.trim().toUpperCase() : "";
    const isCAD = raw === "C$" || raw === "CAD";
    const code = isCAD ? "CAD" : "USD";
    const locale = isCAD ? "en-CA" : "en-US";
    return n.toLocaleString(locale, { style: "currency", currency: code, maximumFractionDigits: 0 });
  }

  function coerceToString(...values: unknown[]): string | undefined {
    for (const v of values) {
      if (typeof v === "string" && v.trim().length > 0) return v.trim();
      if (typeof v === "number" && Number.isFinite(v)) return String(v);
    }
    return undefined;
  }

  function extractListArray(payload: unknown): unknown[] {
    if (Array.isArray(payload)) return payload;
    if (!payload || typeof payload !== "object") return [];
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.properties)) return obj.properties;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.results)) return obj.results;
    if (Array.isArray(obj.listings)) return obj.listings;
    return [];
  }

  function parseListingItems(payload: unknown): SearchProperty[] {
    const rawItems = extractListArray(payload);

    const mapped: SearchProperty[] = [];
    for (const item of rawItems) {
      if (!item || typeof item !== "object") continue;
      const record = item as Record<string, unknown>;

      const id = coerceToString(record.zpid, record.id, record.providerListingId);

      const addrObj = record.address && typeof record.address === "object"
        ? (record.address as Record<string, unknown>)
        : null;
      const street = firstNonEmptyString(
        record.addressRaw,
        addrObj?.street,
        record.streetAddress,
        record.addressStreet,
      );
      if (!id || !street) continue;

      const city = firstNonEmptyString(addrObj?.city, record.addressCity);
      const state = firstNonEmptyString(addrObj?.state, record.addressState);

      const statusLabel = firstNonEmptyString(record.status, record.statusText);
      const badge = statusLabel
        ? statusLabel.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Live Listing";

      const homeType = firstNonEmptyString(record.homeType);
      const formattedType = homeType
        ? homeType.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : null;

      const photos = Array.isArray(record.photos) ? record.photos : [];
      const imageUrl = firstNonEmptyString(
        record.image,
        photos[0],
        record.imgSrc,
        record.thumbnailUrl,
      );

      mapped.push({
        id,
        name: formattedType ? `${formattedType} — ${street}` : street,
        price: toPrice(record.price ?? record.unformattedPrice, record.currency),
        location: [city, state].filter(Boolean).join(", ") || street,
        badge,
        beds: toNumber(record.beds) ?? 0,
        baths: toNumber(record.baths) ?? 0,
        sqft: String(toNumber(record.area) ?? "N/A"),
        insight: "Fetched from live Zillow listings in your preferred area.",
        image: imageUrl,
      });
    }

    return mapped.slice(0, 5);
  }

  async function onSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (!user && !PREFERRED_LOCATIONS.includes(guestLocation)) {
      setErrorMessage("Please select a location from the dropdown before searching.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setNoteMessage(null);

    try {
      const fallbackKeyword = user ? preferredLocation : guestLocation;

      const response = await fetch("/api/listings/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: trimmed, fallbackKeyword }),
      });

      const data = (await response.json()) as ListingsResponse;
      if (!response.ok) {
        throw new Error(data.error ?? "Search failed.");
      }

      setParsedParams(data.parsedParams ?? null);
      setNoteMessage(data.note ?? null);

      const parsed = parseListingItems(data.listings);
      if (parsed.length > 0) {
        setProperties(parsed);
      } else if (data.listings != null) {
        setErrorMessage(
          "No listings matched your search. Add a location to your search (city, state, or ZIP). Example: “2 bedroom house in Vancouver, BC”.",
        );
        setProperties(fallbackProperties);
      } else {
        setProperties(fallbackProperties);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Search failed.";
      setErrorMessage(message);
      setProperties(fallbackProperties);
      setParsedParams(null);
      setNoteMessage(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // If logged in, fetch profile.preferred_location once
    const fetchPreferredLocation = async () => {
      if (!user) {
        setPreferredLocation(null);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("preferred_location")
        .eq("id", user.id)
        .maybeSingle();
      if (error) {
        // Silent failure; we still let the user search, they'll just see the "add a location" tip if missing
        setPreferredLocation(null);
        return;
      }
      setPreferredLocation(
        data?.preferred_location && typeof data.preferred_location === "string"
          ? data.preferred_location
          : null,
      );
    };

    void fetchPreferredLocation();
  }, [user]);

  const GUEST_LOCATION = "New York, NY";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  useEffect(() => {
    if (didFetchFeatured || !preferredLocation || !user) return;
    setDidFetchFeatured(true);

    const loadFeatured = async () => {
      setFeaturedLoading(true);
      try {
        const { data: row } = await supabase
          .from("featured_listings")
          .select("location, fetched_at, items")
          .eq("user_id", user.id)
          .maybeSingle();

        if (row) {
          const age = Date.now() - new Date(row.fetched_at as string).getTime();
          const items = (row.items ?? []) as SearchProperty[];
          if (
            age < ONE_DAY_MS &&
            row.location === preferredLocation &&
            items.length > 0
          ) {
            setFeaturedProperties(items);
            return;
          }
        }

        const res = await fetch("/api/listings/featured", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword: preferredLocation }),
        });
        if (!res.ok) return;

        const data = (await res.json()) as { listings?: unknown; note?: string };
        if (data.listings == null) return;

        const parsed = parseListingItems(data.listings);
        const top5 = parsed.slice(0, 5);
        if (top5.length > 0) {
          setFeaturedProperties(top5);

          await supabase
            .from("featured_listings")
            .upsert(
              {
                user_id: user.id,
                location: preferredLocation,
                fetched_at: new Date().toISOString(),
                items: top5,
              },
              { onConflict: "user_id" },
            );
        }
      } catch (err) {
        console.warn("[featured] error:", err);
      } finally {
        setFeaturedLoading(false);
      }
    };

    void loadFeatured();
  }, [preferredLocation, didFetchFeatured, user]);

  useEffect(() => {
    if (didFetchFeatured || user !== null) return;
    setDidFetchFeatured(true);

    const CACHE_KEY = "guest_featured_listings";

    interface GuestCache {
      timestamp: number;
      items: SearchProperty[];
    }

    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as GuestCache;
        const age = Date.now() - cached.timestamp;
        if (age < ONE_DAY_MS && cached.items.length > 0) {
          setFeaturedProperties(cached.items);
          return;
        }
      }
    } catch {
      // corrupt cache — continue to fetch
    }

    const loadGuestFeatured = async () => {
      setFeaturedLoading(true);
      try {
        const res = await fetch("/api/listings/featured", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword: GUEST_LOCATION }),
        });
        if (!res.ok) return;

        const data = (await res.json()) as { listings?: unknown; note?: string };
        if (data.listings == null) return;

        const parsed = parseListingItems(data.listings);
        const top5 = parsed.slice(0, 5);
        if (top5.length > 0) {
          setFeaturedProperties(top5);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ timestamp: Date.now(), items: top5 }),
            );
          } catch {
            // localStorage full — non-critical
          }
        }
      } catch (err) {
        console.warn("[guest featured] error:", err);
      } finally {
        setFeaturedLoading(false);
      }
    };

    void loadGuestFeatured();
  }, [didFetchFeatured, user]);

  useEffect(() => {
    if (didAutoRun) return;
    if (!initialQuery.trim()) return;
    setDidAutoRun(true);
    void onSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didAutoRun, initialQuery]);

  return (
    <div className="px-6 pb-20">
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
              if (e.key === "Enter") void onSearch();
            }}
            placeholder="Describe your ideal home..."
            className="flex-1 bg-transparent py-4 px-2 text-on-surface placeholder:text-on-surface-variant/60 outline-none text-base"
          />
          <button
            onClick={onSearch}
            disabled={isLoading}
            className="bg-primary text-on-primary rounded-2xl px-6 py-3.5 font-bold text-sm flex items-center gap-2 transition-transform active:scale-95 shrink-0 disabled:opacity-60"
          >
            <Search size={18} />
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {!user && (
          <div className="relative max-w-2xl mx-auto mt-4" ref={guestLocationRef}>
            <div className="bg-surface-container-highest rounded-2xl p-2 flex items-center gap-2 editorial-shadow">
              <div className="pl-3 text-primary-container">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                value={guestLocation}
                onFocus={() => setShowGuestLocationDropdown(true)}
                onChange={(e) => {
                  setGuestLocation(e.target.value);
                  setShowGuestLocationDropdown(true);
                }}
                placeholder="Select a location..."
                className="flex-1 bg-transparent py-3 px-2 text-on-surface placeholder:text-on-surface-variant/60 outline-none text-sm"
              />
            </div>
            {showGuestLocationDropdown && matchingGuestLocations.length > 0 && (
              <div className="absolute z-20 mt-2 w-full max-h-44 overflow-y-auto rounded-2xl bg-surface-container-highest border border-outline-variant/40 shadow-lg text-left">
                {matchingGuestLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setGuestLocation(loc);
                      setShowGuestLocationDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-on-surface hover:bg-surface-container-high transition-colors text-left"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

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

        {errorMessage && (
          <div className="mt-6 max-w-2xl mx-auto rounded-2xl bg-surface-container p-4 text-left editorial-shadow">
            <p className="text-[11px] uppercase tracking-widest font-bold text-primary-container mb-1">
              Search Tip
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {errorMessage}
            </p>
          </div>
        )}

        {noteMessage && (
          <p className="mt-5 text-sm text-on-surface-variant">{noteMessage}</p>
        )}

        {parsedParams && (
          <pre className="mt-5 text-left text-xs bg-surface-container rounded-2xl p-4 overflow-auto">
            {JSON.stringify(parsedParams, null, 2)}
          </pre>
        )}
      </motion.section>

      {/* Top Recommendations */}
      <section className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[11px] uppercase tracking-widest font-bold text-tertiary-fixed-dim">
            {hasLiveResults ? "Search Results" : "Curated Discovery"}
          </span>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl font-extrabold text-on-surface mt-1">
            {hasLiveResults
              ? "Top Live Results"
              : preferredLocation
                ? `Top 5 Picks in ${preferredLocation}`
                : "Top 5 Picks in New York City"}
          </h2>
          {!hasLiveResults && !featuredLoading && featuredProperties !== fallbackProperties && (
            <p className="text-sm text-on-surface-variant mt-1">
              Refreshed daily from live Zillow listings.
            </p>
          )}
        </motion.div>

        {(() => {
          if (featuredLoading && !hasLiveResults) {
            return (
              <div className="flex items-center justify-center gap-3 py-16 text-on-surface-variant">
                <span className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                <span className="text-sm font-medium">Loading listings from {preferredLocation ?? "New York City"}…</span>
              </div>
            );
          }

          const displayItems = hasLiveResults
            ? properties
            : featuredProperties.length > 0
              ? featuredProperties
              : fallbackProperties;

          const listKey = displayItems.map((p) => p.id).join(",");

          return (
            <motion.div
              key={listKey}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayItems.map((property, i) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  featured={i === 0}
                />
              ))}
            </motion.div>
          );
        })()}
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
              Let our AI agent guide you to properties that feel right — not
              just look right.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button className="bg-on-tertiary-container text-tertiary-container rounded-full px-8 py-3.5 font-bold text-sm flex items-center gap-2 transition-transform active:scale-95">
              Get Started <ArrowRight size={16} />
            </button>
            <button className="text-on-tertiary-container font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Learn more <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
