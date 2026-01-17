"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function VerificationContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "error";
  const message = searchParams.get("message") || "Something went wrong";

  const isSuccess = status === "success";
  const isAlreadyVerified = status === "already_verified";
  const isExpired = status === "expired";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div
          className={`bg-zinc-900/50 border rounded-xl p-8 text-center ${
            isSuccess || isAlreadyVerified
              ? "border-emerald-500/30"
              : isExpired
              ? "border-yellow-500/30"
              : "border-red-500/30"
          }`}
        >
          {/* Icon */}
          <div
            className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${
              isSuccess || isAlreadyVerified
                ? "bg-emerald-500/10"
                : isExpired
                ? "bg-yellow-500/10"
                : "bg-red-500/10"
            }`}
          >
            {isSuccess || isAlreadyVerified ? (
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : isExpired ? (
              <svg
                className="w-8 h-8 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-white mb-2">
            {isSuccess
              ? "Email verified!"
              : isAlreadyVerified
              ? "Already verified"
              : isExpired
              ? "Link expired"
              : "Verification failed"}
          </h1>

          {/* Message */}
          <p className="text-zinc-400 text-sm mb-6">
            {isSuccess
              ? "You're officially on the waitlist. Check your inbox for a welcome email."
              : isAlreadyVerified
              ? "Your email is already verified. You're on the waitlist!"
              : isExpired
              ? "This verification link has expired. Please sign up again to get a new link."
              : message}
          </p>

          {/* Action */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
          >
            {isExpired ? "Sign up again" : "Back to home"}
            <svg
              className="w-4 h-4"
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
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifiedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  );
}
