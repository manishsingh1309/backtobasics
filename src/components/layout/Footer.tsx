import { Link } from "react-router-dom";
import { CHANNEL_URL } from "@/data/seriesData";
import { trackYouTubeOutboundClick } from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-heading text-2xl tracking-widest text-white uppercase">
              Back to Basics with Big Ron
            </span>
            <span className="text-xs font-mono tracking-widest uppercase text-slate-400 mt-1">
              A BIGRONJONES® Production • PRACTICAL ADVICE FOR YOUR REAL WORLD GOALS.®
            </span>
          </div>

          {/* Footer Navigation Links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium"
            aria-label="Footer Navigation"
          >
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors hover:text-white"
              onClick={() => trackYouTubeOutboundClick("channel", CHANNEL_URL)}
            >
              YouTube
            </a>
            <span className="text-slate-600" aria-hidden="true">•</span>
            <Link
              to="/privacy/"
              className="text-slate-300 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600" aria-hidden="true">•</span>
            <a
              href="mailto:ron@thebigronjones.com?subject=Back%20to%20Basics%20Inquiry"
              className="text-slate-300 transition-colors hover:text-white"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Exercise Note */}
        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-800/60 p-4 text-center">
          <p className="text-xs leading-relaxed text-slate-400 italic">
            “These videos are educational. Choose exercises and loads appropriate to your experience and health. Stop if you experience pain.”
          </p>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>
            © {currentYear} BIGRONJONES®. All rights reserved. Registered Trademark.
          </p>
        </div>
      </div>
    </footer>
  );
}
