"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Camera,
  MapPin,
  Bed,
  Bath,
  Ruler,
  LandPlot,
  Sparkles,
  Coffee,
  GraduationCap,
  Car,
  TrendingUp,
  Clock,
  Lock,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const stats = [
  { icon: Bed, label: "Bedrooms", value: "5" },
  { icon: Bath, label: "Bathrooms", value: "4.5" },
  { icon: Ruler, label: "SqFt", value: "4,250" },
  { icon: LandPlot, label: "Lot", value: "1.2 Acres" },
];

const projectionBars = [
  { label: "Year 1", height: 40 },
  { label: "Year 3", height: 58 },
  { label: "Year 5", height: 74 },
  { label: "Year 10", height: 100 },
];

export default function PropertyDetailPage() {
  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Breadcrumb */}
        <motion.nav {...fade(0)} className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-on-surface transition-colors hover:bg-surface-container-high">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
            <span className="cursor-pointer hover:text-on-surface">
              Properties
            </span>
            <ChevronRight size={14} />
            <span className="font-medium text-on-surface">
              Juniper Ridge Estate
            </span>
          </div>
        </motion.nav>

        {/* Hero Gallery */}
        <motion.div
          {...fade(0.05)}
          className="grid h-[500px] grid-cols-4 gap-4"
        >
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-3xl bg-surface-container-highest">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-surface/80 px-4 py-2 text-sm font-medium text-on-surface backdrop-blur-sm">
              <Camera size={15} />
              1/24 Photos
            </div>
          </div>
          <div className="col-span-1 overflow-hidden rounded-2xl bg-surface-container-highest" />
          <div className="col-span-1 overflow-hidden rounded-2xl bg-surface-container-highest" />
          <div className="col-span-1 overflow-hidden rounded-2xl bg-surface-container-highest" />
          <div className="relative col-span-1 overflow-hidden rounded-2xl bg-surface-container-highest">
            <div className="absolute inset-0 flex items-center justify-center bg-on-surface/40 backdrop-blur-[2px]">
              <span className="text-lg font-semibold text-white">
                +20 More
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* ── Left Column ── */}
          <div className="col-span-2 space-y-8">
            {/* Property Info */}
            <motion.div
              {...fade(0.1)}
              className="rounded-3xl bg-surface-container-low p-8"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-on-surface">
                    Juniper Ridge Estate
                  </h1>
                  <div className="mt-2 flex items-center gap-1.5 text-on-surface-variant">
                    <MapPin size={15} />
                    <span className="text-sm">
                      442 Silverleaf Trail, Boulder, CO 80302
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-[family-name:var(--font-headline)] text-3xl font-bold text-on-surface">
                    $2,450,000
                  </p>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    Cap Rate{" "}
                    <span className="font-semibold text-primary">5.2%</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 rounded-2xl bg-surface-container p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
                      <s.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">
                        {s.label}
                      </p>
                      <p className="font-[family-name:var(--font-headline)] text-lg font-semibold text-on-surface">
                        {s.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommendation Writer */}
            <motion.div
              {...fade(0.15)}
              className="rounded-3xl bg-tertiary-container p-12"
            >
              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-on-tertiary-container" />
                <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-tertiary-container">
                  AI Recommendation
                </h2>
              </div>
              <p className="mb-6 leading-relaxed text-on-tertiary-container/90">
                Juniper Ridge Estate is a{" "}
                <span className="font-bold">Strong Buy</span>. Situated in
                Boulder&apos;s most sought-after corridor, the property
                combines premium build quality with a micro-market that has
                demonstrated 12% year-over-year appreciation. Cash-flow
                positive from month one with conservative rental assumptions,
                it ranks in the top tier of our current opportunity set.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-on-tertiary-container/15 px-4 py-1.5 text-sm font-medium text-on-tertiary-container">
                  Top 2% Equity Forecast
                </span>
                <span className="rounded-full bg-on-tertiary-container/15 px-4 py-1.5 text-sm font-medium text-on-tertiary-container">
                  Resilient Micro-market
                </span>
              </div>
            </motion.div>

            {/* Commute Evaluator */}
            <motion.div
              {...fade(0.2)}
              className="rounded-3xl bg-surface-container-low p-8"
            >
              <h2 className="mb-6 font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface">
                Commute &amp; Location
              </h2>
              <div className="mb-6 h-52 rounded-2xl bg-surface-container-highest" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Coffee,
                    label: "Amenities",
                    value: "24 within 1 mi",
                  },
                  {
                    icon: GraduationCap,
                    label: "Schools",
                    value: "8/10 avg rating",
                  },
                  {
                    icon: Car,
                    label: "Downtown",
                    value: "18 min commute",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl bg-surface-container p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">
                        {item.label}
                      </p>
                      <p className="font-[family-name:var(--font-headline)] text-sm font-semibold text-on-surface">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column ── */}
          <div className="col-span-1 space-y-6">
            {/* Financial Analyst Card */}
            <motion.div
              {...fade(0.1)}
              className="rounded-3xl bg-surface-container-highest p-8"
            >
              <h2 className="mb-6 font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface">
                Financial Snapshot
              </h2>

              {/* Annual Cash Flow */}
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">
                    Annual Cash Flow
                  </span>
                  <span className="font-semibold text-primary">+$12,400</span>
                </div>
                <div className="h-2 rounded-full bg-surface-container">
                  <motion.div
                    className="h-2 rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>

              <div className="mb-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">Gross Yield</span>
                  <span className="font-semibold text-on-surface">7.2%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-on-surface-variant">
                    Mortgage Est.
                  </span>
                  <span className="font-semibold text-on-surface">
                    $8,250/mo
                  </span>
                </div>
              </div>

              {/* Investment Projections */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-medium text-on-surface-variant">
                  Investment Projections
                </p>
                <div className="flex items-end justify-between gap-3 h-28">
                  {projectionBars.map((bar, i) => (
                    <div
                      key={bar.label}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <motion.div
                        className="w-full rounded-lg bg-primary-container"
                        initial={{ height: 0 }}
                        animate={{ height: `${bar.height}%` }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + i * 0.1,
                          ease: "easeOut",
                        }}
                      />
                      <span className="text-[11px] text-on-surface-variant">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90">
                <Lock size={15} />
                Unlock Full Report
              </button>
            </motion.div>

            {/* Appreciation Score */}
            <motion.div
              {...fade(0.15)}
              className="rounded-2xl bg-primary-fixed p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-on-primary-fixed-variant">
                    Appreciation Score
                  </p>
                  <p className="font-[family-name:var(--font-headline)] text-4xl font-extrabold text-on-primary-fixed">
                    A+
                  </p>
                </div>
                <TrendingUp size={28} className="text-on-primary-fixed-variant" />
              </div>
              <p className="mt-3 text-sm text-on-primary-fixed-variant">
                +14% value increase by 2026
              </p>
            </motion.div>

            {/* Days on Market */}
            <motion.div
              {...fade(0.2)}
              className="rounded-2xl bg-surface-container-low p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-on-surface-variant">
                    Days on Market
                  </p>
                  <p className="font-[family-name:var(--font-headline)] text-4xl font-extrabold text-on-surface">
                    12
                  </p>
                  <p className="text-sm text-on-surface-variant">Days</p>
                </div>
                <Clock size={28} className="text-on-surface-variant" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
