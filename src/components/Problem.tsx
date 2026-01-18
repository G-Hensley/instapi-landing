"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Manual setup takes forever",
    description: "JWT auth, input validation, rate limiting, error handling, Prisma setup, Docker config... Every project starts with the same 20 hours of boilerplate.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AI code is a dice roll",
    description: "Ask ChatGPT twice, get two different answers. Missing error handling, insecure auth patterns, code that looks right but breaks in production.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Security is an afterthought",
    description: "You know it matters. But when you are shipping fast, it is easy to skip. Then you find out you forgot input sanitization the hard way.",
    gradient: "from-yellow-500 to-emerald-500",
  },
];

export function Problem() {
  return (
    <section className="relative py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sound familiar?
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Every backend project starts the same way. You spend days on infrastructure before writing a single line of business logic.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative h-full bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all">
                {/* Icon */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${problem.gradient} text-white mb-4`}>
                  {problem.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">
                  {problem.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition to solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-zinc-400">
            What if you could skip the boilerplate and start with{" "}
            <span className="text-white font-medium">production-ready code</span>?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
