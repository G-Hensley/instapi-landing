"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/30 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800/80 border border-zinc-700/50 rounded-full mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Coming soon
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Ship backends in minutes,
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            not days.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
        >
          Design your API visually. Generate production-ready code with
          authentication, validation, and tests. Download and deploy.{" "}
          <span className="text-white font-medium">minutes</span> instead of
          hours/days.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Gradient button with glow */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#waitlist" className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Button */}
              <span className="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                Join the waitlist
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </a>

            <a
              href="#demo"
              className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-zinc-100 rounded-xl border border-zinc-700/80 bg-zinc-900/40 hover:bg-zinc-900 transition-colors"
            >
              See the demo
              <svg
                className="w-5 h-5 ml-2 text-zinc-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v14m0 0l6-6m-6 6l-6-6"
                />
              </svg>
            </a>
          </div>

          <p className="text-sm text-zinc-500 mt-5">
            Be first to know when we launch.
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-zinc-500">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Own the code
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Tests included
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              No lock-in
            </li>
          </ul>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20"
        >
          <div className="relative max-w-2xl mx-auto">
            {/* Animated glow effect */}
            <motion.div
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-4 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl"
            />

            {/* Code block */}
            <div className="relative bg-zinc-900/90 border border-zinc-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
              {/* Window controls */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-zinc-500 font-mono">
                  generated/src/routes/users.ts
                </span>
              </div>

              {/* Code content */}
              <div className="p-4 font-mono text-sm text-left overflow-x-auto">
                <code>
                  <span className="text-purple-400">import</span>
                  <span className="text-zinc-300"> {"{ Router }"} </span>
                  <span className="text-purple-400">from</span>
                  <span className="text-emerald-400"> &apos;express&apos;</span>
                  <span className="text-zinc-500">;</span>
                  <br />
                  <span className="text-purple-400">import</span>
                  <span className="text-zinc-300"> {"{ prisma }"} </span>
                  <span className="text-purple-400">from</span>
                  <span className="text-emerald-400">
                    {" "}
                    &apos;../lib/db&apos;
                  </span>
                  <span className="text-zinc-500">;</span>
                  <br />
                  <span className="text-purple-400">import</span>
                  <span className="text-zinc-300"> {"{ auth }"} </span>
                  <span className="text-purple-400">from</span>
                  <span className="text-emerald-400">
                    {" "}
                    &apos;../middleware/auth&apos;
                  </span>
                  <span className="text-zinc-500">;</span>
                  <br />
                  <br />
                  <span className="text-purple-400">const</span>
                  <span className="text-zinc-300"> router </span>
                  <span className="text-cyan-400">=</span>
                  <span className="text-yellow-400"> Router</span>
                  <span className="text-zinc-300">()</span>
                  <span className="text-zinc-500">;</span>
                  <br />
                  <br />
                  <span className="text-zinc-500">
                    {"// GET /users - List all users"}
                  </span>
                  <br />
                  <span className="text-zinc-300">router.</span>
                  <span className="text-yellow-400">get</span>
                  <span className="text-zinc-300">(</span>
                  <span className="text-emerald-400">&apos;/&apos;</span>
                  <span className="text-zinc-300">, auth, </span>
                  <span className="text-purple-400">async</span>
                  <span className="text-zinc-300"> (req, res) </span>
                  <span className="text-cyan-400">=&gt;</span>
                  <span className="text-zinc-300"> {"{"}</span>
                  <br />
                  <span className="text-zinc-300">{"  "}</span>
                  <span className="text-purple-400">const</span>
                  <span className="text-zinc-300"> users </span>
                  <span className="text-cyan-400">=</span>
                  <span className="text-purple-400"> await</span>
                  <span className="text-zinc-300"> prisma.user.</span>
                  <span className="text-yellow-400">findMany</span>
                  <span className="text-zinc-300">()</span>
                  <span className="text-zinc-500">;</span>
                  <br />
                  <span className="text-zinc-300">{"  "}res.</span>
                  <span className="text-yellow-400">json</span>
                  <span className="text-zinc-300">(users)</span>
                  <span className="text-zinc-500">;</span>
                  <br />
                  <span className="text-zinc-300">{"}"});</span>
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
