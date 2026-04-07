"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bot,
  TrendingUp,
  Shield,
  Car,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Brain,
  Building,
  Train,
  Footprints,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function PropertyCard({
  title,
  price,
  beds,
  baths,
  badge,
  index,
  faded = false,
}: {
  title: string;
  price: string;
  beds: number;
  baths: number;
  badge: string;
  index: number;
  faded?: boolean;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`bg-surface-container-low rounded-2xl p-4 soft-shadow ${faded ? "opacity-80" : ""}`}
    >
      <div className="bg-surface-container-highest h-40 rounded-2xl mb-4 flex items-center justify-center">
        <Building className="w-10 h-10 text-on-surface-variant opacity-30" />
      </div>
      <h4 className="font-[family-name:var(--font-headline)] text-on-surface font-semibold text-base">
        {title}
      </h4>
      <p className="text-primary font-semibold text-lg mt-1">{price}</p>
      <p className="text-on-surface-variant text-sm mt-1">
        {beds}bds / {baths}ba
      </p>
      <span className="inline-block mt-3 text-xs font-medium bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full">
        {badge}
      </span>
    </motion.div>
  );
}

function SparklineBar({ height, delay }: { height: number; delay: number }) {
  return (
    <motion.div
      className="w-2 rounded-full bg-primary"
      initial={{ height: 0 }}
      animate={{ height }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    />
  );
}

function CircularGauge({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-surface-container-highest"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-on-surface font-[family-name:var(--font-headline)]">
          {score}
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const sparklineBars = [18, 24, 16, 32, 28, 36, 22, 30, 40, 34, 26, 38];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const displayName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "there";
  const displayEmail = user.email || "";

  return (
    <div className="min-h-screen bg-surface p-8 lg:p-12">
      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="font-[family-name:var(--font-headline)] text-on-surface text-3xl lg:text-4xl font-bold tracking-tight">
          Welcome back, {displayName}.
        </h1>
        <p className="text-on-surface-variant text-base mt-2 max-w-xl">
          {displayEmail} &mdash; Let&apos;s evaluate your next opportunity in the Kensington market.
        </p>
      </motion.section>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column — Active Listings */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="col-span-12 lg:col-span-4 space-y-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-[family-name:var(--font-headline)] text-on-surface text-xl font-semibold">
              Active Listings
            </h2>
            <span className="bg-primary-fixed text-on-surface text-xs font-semibold px-3 py-1 rounded-full">
              12 New
            </span>
          </div>

          <PropertyCard
            title="123 Kensington Lane"
            price="$1.2M"
            beds={3}
            baths={2}
            badge="Ready for Analysis"
            index={2}
          />

          <PropertyCard
            title="45 Oak Ridge Blvd"
            price="$890K"
            beds={2}
            baths={1}
            badge="Ready for Analysis"
            index={3}
            faded
          />
        </motion.div>

        {/* Right Column — AI Strategic Analysis */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Hearth Container */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="bg-tertiary-container rounded-3xl p-8 soft-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-tertiary rounded-xl p-2.5">
                <Bot className="w-5 h-5 text-on-tertiary" />
              </div>
              <h2 className="font-[family-name:var(--font-headline)] text-on-tertiary-container text-xl font-semibold">
                AI Strategic Analysis
              </h2>
            </div>

            <p className="text-on-tertiary-container text-sm leading-relaxed mb-6">
              <span className="font-semibold">Top Recommendation:</span> 123
              Kensington Lane presents a strong investment profile with
              above-average projected returns and a favorable risk environment
              within the current Kensington market conditions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="flex items-center gap-2 text-on-tertiary-container font-semibold text-sm mb-3">
                  <CheckCircle className="w-4 h-4" />
                  Pros
                </h4>
                <ul className="space-y-2 text-on-tertiary-container text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-on-tertiary-container shrink-0" />
                    Strong projected ROI of 7.2% above market average
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-on-tertiary-container shrink-0" />
                    Low crime rate with high walkability score
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-on-tertiary-container shrink-0" />
                    Positive cash flow from month one
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="flex items-center gap-2 text-on-tertiary-container font-semibold text-sm mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  Cons
                </h4>
                <ul className="space-y-2 text-on-tertiary-container text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-on-tertiary-container shrink-0" />
                    Higher entry price relative to nearby comps
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-on-tertiary-container shrink-0" />
                    Property tax reassessment expected in 2026
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-on-tertiary-container shrink-0" />
                    Limited transit access from the property
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Three Agent Widget Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Financial Analyst */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-surface-container-low rounded-3xl p-6 soft-shadow"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="bg-primary-container rounded-xl p-2">
                  <TrendingUp className="w-4 h-4 text-on-primary-container" />
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-on-surface text-sm font-semibold">
                  Financial Analyst
                </h3>
              </div>

              <p className="text-on-surface-variant text-xs mb-1">
                Projected ROI
              </p>
              <p className="text-on-surface text-2xl font-bold font-[family-name:var(--font-headline)]">
                7.2%
              </p>

              <div className="flex items-end gap-1 h-12 mt-4 mb-5">
                {sparklineBars.map((h, i) => (
                  <SparklineBar key={i} height={h} delay={0.4 + i * 0.05} />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-on-surface-variant text-xs">Cap Rate</p>
                  <p className="text-on-surface font-semibold text-sm">5.5%</p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs">Cash Flow</p>
                  <p className="text-on-surface font-semibold text-sm">
                    $850/mo
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Risk Analyst */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-surface-container-low rounded-3xl p-6 soft-shadow"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="bg-secondary-container rounded-xl p-2">
                  <Shield className="w-4 h-4 text-on-secondary-container" />
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-on-surface text-sm font-semibold">
                  Risk Analyst
                </h3>
              </div>

              <CircularGauge score={85} />

              <p className="text-center text-on-surface-variant text-xs mt-3 mb-5">
                Low Risk Environment
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-on-surface-variant text-xs">WalkScore</p>
                  <p className="text-on-surface font-semibold text-sm">
                    92/100
                  </p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs">Crime Rate</p>
                  <p className="text-on-surface font-semibold text-sm">0.2%</p>
                </div>
              </div>
            </motion.div>

            {/* Commute Evaluator */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-surface-container-low rounded-3xl p-6 soft-shadow"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="bg-tertiary-container rounded-xl p-2">
                  <Car className="w-4 h-4 text-on-tertiary-container" />
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-on-surface text-sm font-semibold">
                  Commute Evaluator
                </h3>
              </div>

              <div className="bg-surface-container-highest h-28 rounded-2xl mb-5 flex items-center justify-center">
                <Footprints className="w-8 h-8 text-on-surface-variant opacity-30" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-on-surface-variant shrink-0" />
                  <div>
                    <p className="text-on-surface text-sm font-medium">
                      To Work
                    </p>
                    <p className="text-on-surface-variant text-xs">
                      18 min drive
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Train className="w-4 h-4 text-on-surface-variant shrink-0" />
                  <div>
                    <p className="text-on-surface text-sm font-medium">
                      To Downtown
                    </p>
                    <p className="text-on-surface-variant text-xs">
                      25 min transit
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Deep Analysis CTA */}
          <motion.div
            custom={7}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="bg-surface-container rounded-3xl p-8 flex items-center justify-between soft-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary-container rounded-xl p-3">
                <Brain className="w-5 h-5 text-on-primary-container" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-headline)] text-on-surface font-semibold text-base">
                  Need a deeper look?
                </h3>
                <p className="text-on-surface-variant text-sm mt-0.5">
                  Run a comprehensive multi-agent analysis on this property.
                </p>
              </div>
            </div>
            <button className="bg-primary text-on-primary font-semibold text-sm px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shrink-0">
              Run Deep Analysis
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
