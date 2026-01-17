import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-[150px] sm:text-[200px] font-bold leading-none bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 -mt-4">
          Page not found
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <svg
            className="w-5 h-5"
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
      </div>
    </div>
  );
}
