"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Design",
    description:
      "Name your resources and define your fields. Select types, set validations, mark what's required.",
    gradient: "from-emerald-500 to-cyan-500",
    gradientText: "from-emerald-400 to-cyan-400",
  },
  {
    number: "02",
    title: "Configure",
    description:
      "Choose which endpoints to generate. Set authentication requirements. Define relationships between resources.",
    gradient: "from-cyan-500 to-blue-500",
    gradientText: "from-cyan-400 to-blue-400",
  },
  {
    number: "03",
    title: "Generate",
    description:
      "One click. Get production-ready Express code with Prisma, JWT auth, validation, and tests.",
    gradient: "from-blue-500 to-violet-500",
    gradientText: "from-blue-400 to-violet-400",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "Download your code. It runs. Deploy to any host you want. You own it completely.",
    gradient: "from-violet-500 to-pink-500",
    gradientText: "from-violet-400 to-pink-400",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 px-6 bg-black">
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
            How it works
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            From idea to deployed backend in four steps. No boilerplate. No
            security oversights.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-11 left-full w-full h-px bg-gradient-to-r from-zinc-700 via-zinc-800 to-transparent z-0" />
              )}

              <div className="relative bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all h-full">
                {/* Header with number and title inline */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Outlined gradient number badge */}
                  <span className="relative flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    {/* Gradient border */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-lg`}
                    />
                    {/* Dark inner background */}
                    <span className="absolute inset-[1.5px] bg-zinc-900 rounded-[6px]" />
                    {/* Gradient text */}
                    <span
                      className={`relative text-sm font-bold bg-gradient-to-br ${step.gradientText} bg-clip-text text-transparent`}
                    >
                      {step.number}
                    </span>
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Time comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-zinc-900/50 border border-zinc-800/50 rounded-full backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-sm">Manual setup:</span>
              <span className="text-zinc-500 font-mono line-through">
                hours/days
              </span>
            </div>
            <div className="w-px h-4 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 text-sm">With InstAPI:</span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-mono font-bold">
                minutes
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
