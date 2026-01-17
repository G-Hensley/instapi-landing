import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - InstAPI",
  description: "Terms of Service for InstAPI",
};

export default function TermsOfService() {
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

        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400 mb-6">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" , year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-400">
              By accessing and using InstAPI (&quot;the Service&quot;), you accept and agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-zinc-400">
              InstAPI is a tool that generates production-ready backend APIs. The Service is currently
              in development, and by joining the waitlist, you are expressing interest in early access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. Waitlist</h2>
            <p className="text-zinc-400 mb-4">
              By joining the waitlist, you agree to:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Provide accurate email information</li>
              <li>Receive occasional emails about InstAPI updates and launch information</li>
              <li>Understand that joining the waitlist does not guarantee access to the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. User Conduct</h2>
            <p className="text-zinc-400 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Use automated systems to submit multiple waitlist entries</li>
              <li>Provide false or misleading information</li>
              <li>Attempt to disrupt or compromise the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">5. Intellectual Property</h2>
            <p className="text-zinc-400">
              All content, features, and functionality of the Service are owned by InstAPI and are
              protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">6. Disclaimer</h2>
            <p className="text-zinc-400">
              The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
              that the Service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-zinc-400">
              In no event shall InstAPI be liable for any indirect, incidental, special, consequential,
              or punitive damages arising out of your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">8. Changes to Terms</h2>
            <p className="text-zinc-400">
              We reserve the right to modify these terms at any time. We will notify users of any
              material changes via email or by posting a notice on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">9. Contact Us</h2>
            <p className="text-zinc-400">
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@instapi.app" className="text-emerald-400 hover:text-emerald-300">
                legal@instapi.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
