import { Link } from "react-router-dom";
import BrandName from "@/components/shared/BrandName";
import { CHANNEL_URL, ASSESSMENT_URL, COACHING_URL } from "@/data/seriesData";
import { trackYouTubeOutboundClick } from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-[#FFFFFF] pt-14 pb-12 text-slate-900">
      {/* Signature BigRonJones® Background Watermark (Identical to bigronjones site) */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-0 right-0 select-none whitespace-nowrap text-center font-heading leading-none text-slate-200/40"
        style={{
          fontSize: "clamp(3.5rem, 14vw, 16rem)",
          letterSpacing: "0.02em",
        }}
      >
        BIGRONJONES
        <span
          style={{
            fontSize: "0.30em",
            verticalAlign: "0.82em",
            fontWeight: 800,
            marginLeft: "0.06em",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          ®
        </span>
      </span>

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/brand/main.png"
                alt="BigRonJones®"
                className="h-11 w-11 select-none rounded-full border-2 border-[#0A3161]/70 object-cover object-center shadow-sm"
              />
              <div>
                <span className="font-heading text-2xl tracking-[0.08em] text-[#0A3161] block leading-none">
                  Back to Basics with <BrandName variant="upper" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#B31942] font-bold">
                  OFFICIAL WORKOUT SERIES · HAHIRA, GA
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-2 font-sans uppercase font-medium tracking-wide">
              PRACTICAL ADVICE FOR YOUR REAL WORLD GOALS.
              <span
                style={{
                  fontSize: "0.78em",
                  verticalAlign: "super",
                  fontWeight: 700,
                  marginLeft: "0.08em",
                }}
              >
                ®
              </span>
            </p>
            <p className="text-xs text-slate-500 font-mono">
              BigRonJonesLLC · Hahira, GA 31632
            </p>
          </div>

          {/* Links & Contact Col */}
          <div className="md:text-right flex flex-col md:items-end justify-between">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">
                Questions & Training Support
              </h4>
              <a
                href="mailto:Coaching@BigRonJones.com?subject=Back%20to%20Basics%20Inquiry"
                className="text-sm text-[#0A3161] hover:text-[#B31942] font-mono font-medium transition-colors"
              >
                Coaching@BigRonJones.com
              </a>
            </div>

            {/* Navigation & Outbound Hub Links */}
            <div className="mt-6 flex flex-wrap items-center md:justify-end gap-x-3 gap-y-2 text-sm font-semibold text-slate-700">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackYouTubeOutboundClick("channel", CHANNEL_URL)}
                className="hover:text-[#0A3161] transition-colors"
              >
                YouTube
              </a>
              <span className="text-slate-300" aria-hidden="true">|</span>
              <a
                href="/#his-and-her"
                className="hover:text-[#0A3161] transition-colors"
              >
                His & Her Series
              </a>
              <span className="text-slate-300" aria-hidden="true">|</span>
              <a
                href={ASSESSMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A3161] hover:text-[#B31942] transition-colors"
              >
                Free Assessment
              </a>
              <span className="text-slate-300" aria-hidden="true">|</span>
              <a
                href={COACHING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0A3161] transition-colors"
              >
                Coaching
              </a>
              <span className="text-slate-300" aria-hidden="true">|</span>
              <Link
                to="/privacy/"
                className="hover:text-[#0A3161] transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-300" aria-hidden="true">|</span>
              <a
                href="mailto:Coaching@BigRonJones.com?subject=Back%20to%20Basics%20Contact"
                className="hover:text-[#0A3161] transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Exercise Note verbatim from brief */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-xs leading-relaxed text-slate-600 italic">
            “These videos are educational. Choose exercises and loads appropriate to your experience and health. Stop if you experience pain.”
          </p>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-500 font-mono">
          <p>
            © {currentYear} BigRonJonesLLC. All rights reserved. <BrandName variant="upper" /> is a registered trademark of BigRonJonesLLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
