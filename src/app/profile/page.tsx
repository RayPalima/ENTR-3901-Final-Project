"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, User, Shield, Bell, Key, Mail, Phone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        enabled ? "bg-primary" : "bg-surface-container-highest"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-on-primary transition-transform shadow-md ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function ProfilePage() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);

  const [fullName, setFullName] = useState("Sarah Jenkins");
  const [email, setEmail] = useState("sarah.jenkins@homestead.io");
  const [phone, setPhone] = useState("+1 (555) 012-3456");

  return (
    <div className="px-12 mt-12 max-w-7xl">
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-12 gap-8"
      >
        {/* Profile Card */}
        <motion.div
          variants={fadeUp}
          custom={0}
          className="col-span-4 bg-tertiary-container rounded-3xl p-10 text-center self-start"
        >
          <div className="relative inline-block mb-6">
            <div className="w-48 h-48 rounded-2xl bg-surface-container-highest mx-auto" />
            <button className="absolute bottom-2 right-2 bg-primary text-on-primary rounded-full p-2 shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
              <Edit size={16} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-on-tertiary-container font-[family-name:var(--font-headline)]">
            Sarah Jenkins
          </h2>
          <p className="text-sm text-on-tertiary-container/60 mt-1 mb-8">
            Premium Homeowner
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-on-tertiary-container/5 rounded-2xl p-4">
              <p className="text-2xl font-bold text-on-tertiary-container font-[family-name:var(--font-headline)]">
                12
              </p>
              <p className="text-xs text-on-tertiary-container/60 mt-1">
                Properties
              </p>
            </div>
            <div className="bg-on-tertiary-container/5 rounded-2xl p-4">
              <p className="text-2xl font-bold text-on-tertiary-container font-[family-name:var(--font-headline)]">
                34
              </p>
              <p className="text-xs text-on-tertiary-container/60 mt-1">
                Tenants
              </p>
            </div>
          </div>

          <button className="w-full py-3 bg-on-tertiary-container/10 text-on-tertiary-container rounded-full text-sm font-semibold hover:bg-on-tertiary-container/15 transition-colors font-[family-name:var(--font-headline)]">
            Edit Photo
          </button>
        </motion.div>

        {/* Right Column — Form Sections */}
        <div className="col-span-8 space-y-6">
          {/* Personal Information */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="bg-surface-container-low p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10">
                <User size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-headline)]">
                Personal Information
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-6 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-6 pl-14 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container-highest border-none rounded-xl py-4 px-6 pl-14 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Account Security */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="bg-surface-container-low p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Shield size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-headline)]">
                  Account Security
                </h3>
              </div>
              <button className="flex items-center gap-2 py-2 px-5 bg-primary/10 text-primary rounded-full text-sm font-semibold hover:bg-primary/15 transition-colors">
                <Key size={14} />
                Update Password
              </button>
            </div>

            <div className="flex items-center justify-between bg-surface-container-highest rounded-xl py-4 px-6">
              <div>
                <p className="text-sm font-semibold text-on-surface">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Toggle
                enabled={twoFactor}
                onToggle={() => setTwoFactor(!twoFactor)}
              />
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="bg-surface-container-low p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-primary/10">
                <Bell size={20} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-on-surface font-[family-name:var(--font-headline)]">
                Notification Preferences
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Email Notifications",
                  desc: "Receive updates via email",
                  enabled: emailNotif,
                  toggle: () => setEmailNotif(!emailNotif),
                },
                {
                  label: "SMS Alerts",
                  desc: "Get text message notifications",
                  enabled: smsAlerts,
                  toggle: () => setSmsAlerts(!smsAlerts),
                },
                {
                  label: "Push Notifications",
                  desc: "Browser and mobile push alerts",
                  enabled: pushNotif,
                  toggle: () => setPushNotif(!pushNotif),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between bg-surface-container-highest rounded-xl py-4 px-6"
                >
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {item.label}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  <Toggle enabled={item.enabled} onToggle={item.toggle} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="flex justify-end gap-4 pt-2 pb-12"
          >
            <button className="py-3 px-8 text-on-surface-variant text-sm font-semibold rounded-full hover:bg-surface-container-highest transition-colors font-[family-name:var(--font-headline)]">
              Discard Changes
            </button>
            <button className="py-3 px-8 bg-gradient-to-r from-primary to-primary/80 text-on-primary text-sm font-bold rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all font-[family-name:var(--font-headline)]">
              Save Profile Changes
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
