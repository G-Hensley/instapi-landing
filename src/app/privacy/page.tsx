import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - InstAPI",
  description: "Privacy Policy for InstAPI",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 mb-6">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-zinc-400 mb-4">
              When you join our waitlist, we collect:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Your email address</li>
              <li>Your preferred programming language</li>
              <li>The date and time you signed up</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-zinc-400 mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Send you updates about InstAPI&apos;s launch</li>
              <li>Notify you about early access opportunities</li>
              <li>Understand which programming languages are most in demand</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. Data Storage</h2>
            <p className="text-zinc-400">
              Your data is securely stored using Supabase, a trusted database provider with
              enterprise-grade security. We implement row-level security policies to protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. Email Communications</h2>
            <p className="text-zinc-400">
              We use Resend to send transactional emails. You will receive a verification email
              when you sign up and occasional updates about InstAPI. You can unsubscribe at any time
              by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">5. Analytics</h2>
            <p className="text-zinc-400">
              We use Vercel Analytics and Google Analytics to understand how visitors use our website.
              This helps us improve the user experience. These services may collect anonymous usage data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
            <p className="text-zinc-400 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">7. Contact Us</h2>
            <p className="text-zinc-400">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@instapi.app" className="text-emerald-400 hover:text-emerald-300">
                privacy@instapi.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
