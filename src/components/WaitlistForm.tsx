"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  preferredLang: z.string().min(1, "Please select a language"),
  website: z.string().max(0).optional(), // Honeypot - must be empty
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const languages = [
  { value: "nodejs", label: "Node.js / Express" },
  { value: "python", label: "Python / FastAPI" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java / Spring Boot" },
  { value: "ruby", label: "Ruby on Rails" },
  { value: "other", label: "Other" },
];

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      preferredLang: "",
      website: "", // Honeypot
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again in a minute.");
        }
        throw new Error(result.error || "Something went wrong");
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative py-24 px-6 bg-gradient-to-b from-zinc-950 to-black"
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get early access
          </h2>
          <p className="text-zinc-400">
            Join the waitlist and be first to know when InstAPI launches. We&apos;ll
            send you a verification email.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900/50 border border-emerald-500/30 rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-emerald-500/10">
                  <svg
                    className="w-8 h-8 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Check your email!
                </h3>
                <p className="text-zinc-400 text-sm">
                  We&apos;ve sent a verification link to your inbox. Click the link
                  to confirm your spot on the waitlist.
                </p>
                <p className="text-zinc-500 text-xs mt-4">
                  The link expires in 24 hours. Check your spam folder if you don&apos;t see it.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 sm:p-8"
              >
                {/* Email field */}
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors ${
                      errors.email ? "border-red-500" : "border-zinc-700"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Language field */}
                <div className="mb-6">
                  <label
                    htmlFor="preferredLang"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Preferred language
                  </label>
                  <select
                    {...register("preferredLang")}
                    id="preferredLang"
                    className={`w-full px-4 py-3 bg-zinc-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors appearance-none cursor-pointer ${
                      errors.preferredLang ? "border-red-500" : "border-zinc-700"
                    }`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      backgroundSize: "20px",
                    }}
                  >
                    <option value="" className="text-zinc-500">
                      Select a language...
                    </option>
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  {errors.preferredLang && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.preferredLang.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-zinc-500">
                    We&apos;ll prioritize languages based on demand.
                  </p>
                </div>

                {/* Honeypot field - hidden from real users */}
                <div
                  className="absolute left-[-9999px]"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    {...register("website")}
                    type="text"
                    id="website"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit button */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Join the waitlist
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                    )}
                  </button>
                </div>

                {/* Privacy note */}
                <p className="mt-4 text-xs text-zinc-600 text-center">
                  No spam. Unsubscribe anytime. We&apos;ll only email you about
                  InstAPI.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
