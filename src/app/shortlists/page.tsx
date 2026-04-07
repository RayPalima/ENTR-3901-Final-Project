"use client";

import { motion } from "framer-motion";
import { Bookmark, MapPin, X, Building, BarChart3, LayoutGrid, Columns } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const properties = [
  {
    name: "Oakwood Manor",
    location: "Austin, TX",
    address: "412 Oakwood Dr",
    price: "$845,000",
    match: 98,
    roi: "12.4%",
    cap: "6.8%",
    walkScore: "91/100",
    appreciation: "6.2%",
  },
  {
    name: "Crestview Estates",
    location: "Boulder, CO",
    address: "880 Crestview Blvd",
    price: "$1.2M",
    match: 82,
    roi: "9.1%",
    cap: "5.2%",
    walkScore: "78/100",
    appreciation: "4.8%",
  },
  {
    name: "Willow Brook Loft",
    location: "Portland, OR",
    address: "1560 Willow Brook Ln",
    price: "$620,000",
    match: 74,
    roi: "15.2%",
    cap: "7.5%",
    walkScore: "85/100",
    appreciation: "5.5%",
  },
];

function matchColor(match: number) {
  if (match >= 90) return "bg-tertiary text-on-tertiary";
  if (match >= 80) return "bg-primary text-on-primary";
  return "bg-secondary-container text-on-secondary-container";
}

function roiBadgeColor(roi: string) {
  const val = parseFloat(roi);
  if (val >= 12) return "bg-tertiary-container text-on-tertiary-container";
  if (val >= 9) return "bg-primary-container text-on-primary-container";
  return "bg-secondary-container text-on-secondary-container";
}

export default function ShortlistsPage() {
  return (
    <div className="min-h-screen bg-surface-container-low p-8 lg:p-12 pb-32">
      {/* Context Bar */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-10"
      >
        <div className="flex items-center gap-3">
          <h1 className="font-[family-name:var(--font-headline)] text-on-surface text-3xl lg:text-4xl font-bold tracking-tight">
            Saved Shortlists
          </h1>
          <span className="bg-primary-container text-on-primary-container text-xs font-semibold px-3 py-1 rounded-full">
            3 Shortlists
          </span>
          <span className="bg-surface-container-high text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full">
            Updated 2h ago
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-primary text-on-primary text-sm font-semibold px-5 py-2.5 rounded-2xl hover:opacity-90 transition-opacity cursor-pointer">
            <LayoutGrid className="w-4 h-4" />
            Grid View
          </button>
          <button className="flex items-center gap-2 bg-surface-container-high text-on-surface-variant text-sm font-medium px-5 py-2.5 rounded-2xl hover:bg-surface-container-highest transition-colors cursor-pointer">
            <Columns className="w-4 h-4" />
            Compare Mode
          </button>
        </div>
      </motion.section>

      {/* Hearth Container */}
      <motion.section
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-tertiary-container rounded-3xl p-12 mb-12 soft-shadow"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-tertiary rounded-xl p-2.5">
            <BarChart3 className="w-5 h-5 text-on-tertiary" />
          </div>
          <h2 className="font-[family-name:var(--font-headline)] text-on-tertiary-container text-3xl font-bold">
            Investment Sweet Spot
          </h2>
        </div>
        <p className="text-on-tertiary-container text-sm leading-relaxed max-w-2xl mb-8">
          Properties in this shortlist were selected based on your criteria: high
          projected ROI, favorable cap rates, and strong neighborhood
          fundamentals. Here&apos;s a snapshot of your portfolio potential.
        </p>
        <div className="flex items-center gap-12">
          <div>
            <p className="text-on-tertiary-container text-sm font-medium mb-1">
              Avg. ROI
            </p>
            <p className="font-[family-name:var(--font-headline)] text-on-tertiary-container text-4xl font-bold">
              8.4%
            </p>
          </div>
          <div className="w-px h-14 bg-on-tertiary-container/20" />
          <div>
            <p className="text-on-tertiary-container text-sm font-medium mb-1">
              Avg. Cap Rate
            </p>
            <p className="font-[family-name:var(--font-headline)] text-on-tertiary-container text-4xl font-bold">
              5.2%
            </p>
          </div>
        </div>
      </motion.section>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {properties.map((property, i) => (
          <motion.div
            key={property.name}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="group bg-surface-container rounded-3xl overflow-hidden soft-shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="relative">
              <div className="bg-surface-container-highest h-64 flex items-center justify-center">
                <Building className="w-12 h-12 text-on-surface-variant opacity-20 group-hover:opacity-30 transition-opacity" />
              </div>
              <span
                className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${matchColor(property.match)}`}
              >
                {property.match}% Match
              </span>
              <button className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm rounded-full p-2 hover:bg-surface transition-colors cursor-pointer">
                <Bookmark className="w-4 h-4 text-primary fill-primary" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="font-[family-name:var(--font-headline)] text-on-surface text-lg font-semibold">
                {property.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-on-surface-variant" />
                <p className="text-on-surface-variant text-sm">
                  {property.location}
                </p>
              </div>
              <p className="text-primary font-bold text-xl font-[family-name:var(--font-headline)]">
                {property.price}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-outline-variant">
                <div>
                  <p className="text-on-surface-variant text-xs mb-1">
                    ROI Forecast
                  </p>
                  <p className="text-on-surface font-semibold text-sm">
                    {property.roi}
                  </p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs mb-1">
                    Cap Rate
                  </p>
                  <p className="text-on-surface font-semibold text-sm">
                    {property.cap}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deep Comparison Section */}
      <motion.section
        custom={6}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-[family-name:var(--font-headline)] text-on-surface text-2xl font-bold whitespace-nowrap">
            Deep Comparison
          </h2>
          <div className="flex-1 h-px bg-outline-variant" />
        </div>

        <div className="bg-surface-container-high rounded-3xl p-10 soft-shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="pb-4 text-on-surface-variant text-sm font-medium pr-6">
                  Metric
                </th>
                {properties.map((p) => (
                  <th
                    key={p.name}
                    className="pb-4 text-on-surface text-sm font-semibold font-[family-name:var(--font-headline)] pr-6"
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 text-on-surface-variant font-medium pr-6">
                  Address
                </td>
                {properties.map((p) => (
                  <td key={p.name} className="py-4 text-on-surface pr-6">
                    {p.address}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 text-on-surface-variant font-medium pr-6">
                  Price
                </td>
                {properties.map((p) => (
                  <td
                    key={p.name}
                    className="py-4 text-on-surface font-semibold pr-6"
                  >
                    {p.price}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 text-on-surface-variant font-medium pr-6">
                  ROI Forecast
                </td>
                {properties.map((p) => (
                  <td key={p.name} className="py-4 pr-6">
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${roiBadgeColor(p.roi)}`}
                    >
                      {p.roi}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 text-on-surface-variant font-medium pr-6">
                  Cap Rate
                </td>
                {properties.map((p) => (
                  <td key={p.name} className="py-4 text-on-surface pr-6">
                    {p.cap}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-outline-variant/50">
                <td className="py-4 text-on-surface-variant font-medium pr-6">
                  WalkScore
                </td>
                {properties.map((p) => (
                  <td
                    key={p.name}
                    className="py-4 text-tertiary font-semibold pr-6"
                  >
                    {p.walkScore}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 text-on-surface-variant font-medium pr-6">
                  Appreciation
                </td>
                {properties.map((p) => (
                  <td key={p.name} className="py-4 text-on-surface pr-6">
                    {p.appreciation}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Floating Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 md:ml-36 bg-inverse-surface text-inverse-on-surface rounded-full px-8 py-4 flex items-center gap-6 shadow-2xl z-50"
      >
        <div className="flex items-center -space-x-2">
          {properties.map((p) => (
            <div
              key={p.name}
              className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-inverse-surface flex items-center justify-center"
            >
              <Building className="w-3.5 h-3.5 text-on-surface-variant" />
            </div>
          ))}
        </div>
        <span className="text-sm font-medium whitespace-nowrap">
          3 properties selected
        </span>
        <div className="w-px h-6 bg-inverse-on-surface/20" />
        <button className="flex items-center gap-1.5 text-sm font-medium text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors cursor-pointer">
          <X className="w-4 h-4" />
          Clear All
        </button>
        <button className="bg-primary text-on-primary text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer">
          Generate Report
        </button>
      </motion.div>
    </div>
  );
}
