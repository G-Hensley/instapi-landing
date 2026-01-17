import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-800/50 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="group flex items-center gap-2 cursor-pointer">
            <Image
              src="/logo.png"
              alt="InstAPI Logo"
              width={32}
              height={32}
              className="w-8 h-8 transition-transform duration-500 ease-in-out group-hover:rotate-180"
            />
            <span className="font-semibold bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">InstAPI</span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-zinc-500">
            Ship backends in{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              minutes
            </span>
            , not days.
          </p>

          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-zinc-600">
            <span>&copy; {new Date().getFullYear()} InstAPI</span>
            <a
              href="/privacy"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-zinc-600">
          <span>Built by</span>
          <a
            href="https://codaissance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Codaissance
          </a>
          <span className="hidden sm:inline text-zinc-700">×</span>
          <span className="sm:hidden">in collaboration with</span>
          <a
            href="https://tampertantrumlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            TamperTantrum Labs
          </a>
        </div>
      </div>
    </footer>
  );
}
