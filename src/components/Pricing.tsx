"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Test it out",
    features: [
      "10 endpoints per month",
      "TypeScript/Node.js only",
      "Basic CRUD & JWT auth",
      "No tests or docs export",
    ],
    cta: "Join waitlist",
    highlighted: false,
  },
  {
    name: "Starter Pack",
    price: "$39",
    unit: "one-time",
    description: "For side projects",
    features: [
      "50 endpoints (never expire)",
      "All languages available",
      "Tests & docs export",
      "Docker files included",
      "Full security features",
    ],
    cta: "Join waitlist",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    unit: "/month",
    description: "For regular builders",
    features: [
      "75 endpoints per month",
      "Rollover up to 100 total",
      "All current & future features",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Join waitlist",
    highlighted: true,
    badge: "Popular",
  },
  {
    name: "Team",
    price: "$129",
    unit: "/month",
    description: "For teams and agencies",
    features: [
      "250 endpoints per month",
      "Rollover up to 350 total",
      "Team workspace",
      "Shared templates",
      "Priority support (12hr)",
    ],
    cta: "Join waitlist",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pay per endpoint
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Use endpoints across multiple projects or build one large project.
            Start free, upgrade when you need more.
          </p>
        </motion.div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col p-6 rounded-xl ${
                tier.highlighted
                  ? "bg-zinc-900"
                  : "bg-zinc-900/30 border border-zinc-800"
              }`}
              style={
                tier.highlighted
                  ? {
                      background:
                        "linear-gradient(rgb(24 24 27), rgb(24 24 27)) padding-box, linear-gradient(to right, rgb(16 185 129), rgb(6 182 212), rgb(59 130 246)) border-box",
                      border: "1px solid transparent",
                    }
                  : undefined
              }
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="relative inline-flex items-center text-xs font-semibold rounded-full overflow-hidden">
                    {/* Gradient border */}
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-full" />
                    {/* Dark inner background */}
                    <span className="absolute inset-[1px] bg-zinc-900 rounded-full" />
                    {/* Gradient text */}
                    <span className="relative px-3 py-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {tier.badge}
                    </span>
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-zinc-500">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {tier.price}
                </span>
                {tier.unit && (
                  <span className="text-zinc-500 ml-1">{tier.unit}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {tier.highlighted ? (
                <a href="#waitlist" className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="relative inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-lg transition-transform group-hover:scale-[1.02]">
                    {tier.cta}
                  </span>
                </a>
              ) : (
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 transition-all"
                >
                  {tier.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
