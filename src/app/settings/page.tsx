"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Home,
  Building,
  Store,
  Briefcase,
  PartyPopper,
  TreePine,
  GraduationCap,
  Lightbulb,
  MapPin,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

type PropertyType = "single" | "multi" | "commercial";

export default function SettingsPage() {
  const [roi, setRoi] = useState(8.5);
  const [budget, setBudget] = useState("1,250,000");
  const [downPayment, setDownPayment] = useState("20");
  const [selectedType, setSelectedType] = useState<PropertyType>("single");
  const [workCommute, setWorkCommute] = useState(30);
  const [downtownCommute, setDowntownCommute] = useState(15);
  const [parksToggle, setParksToggle] = useState(true);
  const [schoolsToggle, setSchoolsToggle] = useState(false);

  const propertyTypes: {
    key: PropertyType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "single",
      label: "Single Family",
      icon: <Home className="w-5 h-5" />,
    },
    {
      key: "multi",
      label: "Multi-Family",
      icon: <Building className="w-5 h-5" />,
    },
    {
      key: "commercial",
      label: "Commercial",
      icon: <Store className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-surface-container-low p-12 min-h-screen">
      {/* Hearth Container Header */}
      <motion.section
        variants={fade}
        initial="hidden"
        animate="visible"
        custom={0}
        className="bg-tertiary-container text-on-tertiary-container rounded-3xl p-12 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <PartyPopper className="w-8 h-8" />
          <Briefcase className="w-7 h-7 opacity-60" />
        </div>
        <h1 className="text-4xl font-extrabold font-[family-name:var(--font-headline)] mb-3">
          Define Your North Star.
        </h1>
        <p className="text-on-tertiary-container/80 text-lg max-w-2xl leading-relaxed">
          Your investment settings guide our matching engine — fine-tune your
          goals, preferred property types, and lifestyle priorities so every
          recommendation feels like it was made just for you.
        </p>
      </motion.section>

      {/* Settings Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* ── Left Column ── */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          {/* Financial Goals Card */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={1}
            className="bg-surface rounded-2xl p-8 soft-shadow"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-fixed">
                <Wallet className="w-6 h-6 text-on-primary-container" />
              </span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                Financial Goals
              </h2>
            </div>

            {/* Target Annual ROI */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-on-surface-variant tracking-wide uppercase">
                  Target Annual ROI
                </label>
                <span className="text-2xl font-extrabold text-primary font-[family-name:var(--font-headline)]">
                  {roi.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={0.1}
                value={roi}
                onChange={(e) => setRoi(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-surface-container-high accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-on-surface-variant mt-1">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Budget & Down Payment */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant tracking-wide uppercase mb-2">
                  Max Budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-semibold">
                    $
                  </span>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-surface-container text-on-surface font-semibold text-lg outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface-variant tracking-wide uppercase mb-2">
                  Min Down Payment
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-surface-container text-on-surface font-semibold text-lg outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-semibold">
                    %
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Property Types Card */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={2}
            className="bg-surface rounded-2xl p-8 soft-shadow"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-fixed">
                <Home className="w-6 h-6 text-on-secondary" />
              </span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                Property Types
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {propertyTypes.map((pt) => {
                const active = selectedType === pt.key;
                return (
                  <button
                    key={pt.key}
                    onClick={() => setSelectedType(pt.key)}
                    className={`flex flex-col items-center gap-3 py-5 px-4 rounded-2xl font-semibold transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-primary-container text-on-primary-container shadow-md"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {pt.icon}
                    <span className="text-sm">{pt.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Right Column ── */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          {/* Commute Focus Card */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={3}
            className="bg-surface rounded-2xl p-8 soft-shadow"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-tertiary-fixed">
                <MapPin className="w-6 h-6 text-on-tertiary-container" />
              </span>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                Commute Focus
              </h2>
            </div>

            {/* Commute Entries */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Work HQ */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-on-surface-variant" />
                    <span className="font-semibold text-on-surface">
                      Work HQ
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    Max {workCommute} min
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={workCommute}
                  onChange={(e) => setWorkCommute(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-surface-container-high accent-primary cursor-pointer"
                />
              </div>

              {/* Downtown Hub */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-on-surface-variant" />
                    <span className="font-semibold text-on-surface">
                      Downtown Hub
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary">
                    Max {downtownCommute} min
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={downtownCommute}
                  onChange={(e) => setDowntownCommute(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-surface-container-high accent-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TreePine className="w-5 h-5 text-on-surface-variant" />
                  <span className="font-medium text-on-surface">
                    Proximity to Parks
                  </span>
                </div>
                <button
                  onClick={() => setParksToggle(!parksToggle)}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 cursor-pointer ${
                    parksToggle ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      parksToggle ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-on-surface-variant" />
                  <span className="font-medium text-on-surface">
                    High-Rated Schools
                  </span>
                </div>
                <button
                  onClick={() => setSchoolsToggle(!schoolsToggle)}
                  className={`relative w-12 h-7 rounded-full transition-colors duration-200 cursor-pointer ${
                    schoolsToggle ? "bg-primary" : "bg-outline-variant"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      schoolsToggle ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Strategy Match Insight Card */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={4}
            className="bg-surface-container-highest rounded-2xl p-8 border-l-4 border-primary soft-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold font-[family-name:var(--font-headline)] text-on-surface">
                Strategy Match
              </h3>
            </div>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Based on your commute preferences and target ROI, our engine
              suggests exploring{" "}
              <span className="font-semibold text-on-surface">
                Transit-Oriented Development
              </span>{" "}
              corridors — properties within walking distance of major transit
              lines tend to appreciate 12–18% faster in your selected markets.
            </p>
            <button className="w-full py-3 bg-primary text-on-primary font-semibold rounded-full hover:opacity-90 transition-opacity cursor-pointer">
              Save &amp; Sync Profile
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
