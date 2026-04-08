"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { MapPin, Bed, Bath, Ruler, Sparkles, ArrowLeft, ExternalLink } from "lucide-react";

function param(searchParams: URLSearchParams, key: string, fallback = ""): string {
  return searchParams.get(key) ?? fallback;
}

export default function PropertyDetailsPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const name = param(searchParams, "name", "Property Listing");
  const price = param(searchParams, "price", "Price unavailable");
  const location = param(searchParams, "location", "Location unavailable");
  const badge = param(searchParams, "badge", "Live Listing");
  const beds = param(searchParams, "beds", "N/A");
  const baths = param(searchParams, "baths", "N/A");
  const sqft = param(searchParams, "sqft", "N/A");
  const insight = param(
    searchParams,
    "insight",
    "Live listing fetched from Zillow results.",
  );
  const image = searchParams.get("image");
  const zestimate = searchParams.get("zestimate");
  const listingUrl = searchParams.get("listingUrl");

  return (
    <div className="px-6 pb-20">
      <section className="max-w-5xl mx-auto pt-14">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6"
        >
          <ArrowLeft size={16} />
          Back to Browse
        </Link>

        <div className="bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
          <div className="relative bg-surface-container-highest h-72 md:h-96">
            {image ? (
              <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : null}
            <div className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container">
              {badge}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="font-[family-name:var(--font-headline)] font-extrabold text-3xl text-primary leading-tight">
              {name}
            </h1>
            <div className="flex items-center gap-1.5 mt-2 text-on-surface-variant">
              <MapPin size={15} />
              <span className="text-sm">{location}</span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest font-bold text-primary-container">
                  Listing Info
                </p>
                <p className="mt-2 text-2xl font-extrabold text-on-surface">{price}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-on-surface-variant text-sm">
                  <span className="flex items-center gap-1">
                    <Bed size={15} /> {beds} Bed
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={15} /> {baths} Bath
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler size={15} /> {sqft} sqft
                  </span>
                </div>
              </div>

              <div className="bg-surface-container rounded-2xl p-5">
                <p className="text-xs uppercase tracking-widest font-bold text-primary-container">
                  Zestimate
                </p>
                <p className="mt-2 text-2xl font-extrabold text-on-surface">
                  {zestimate ?? "Not available"}
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Zillow&apos;s estimated market value for this property.
                </p>
              </div>
            </div>

            <div className="bg-primary-fixed/30 rounded-xl p-4 mt-6">
              <p className="text-[11px] uppercase tracking-widest font-bold text-primary-container mb-1.5 flex items-center gap-1.5">
                <Sparkles size={12} /> AI Agent Insight
              </p>
              <p className="text-sm italic text-on-surface-variant leading-relaxed">
                {insight}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {listingUrl ? (
                <a
                  href={listingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary rounded-2xl px-5 py-3 text-sm font-bold"
                >
                  View Original Listing <ExternalLink size={15} />
                </a>
              ) : null}
              <span className="inline-flex items-center rounded-2xl px-4 py-3 text-xs font-medium text-on-surface-variant bg-surface-container">
                Listing ID: {params.id}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
