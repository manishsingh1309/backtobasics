import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Play } from "lucide-react";
import BrandName from "@/components/shared/BrandName";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      {/* Top utility strip — Practical Advice for Your Real World Goals.® only */}
      <div className="bg-[#0A3161] py-1.5 px-4 text-center">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white font-medium">
          PRACTICAL ADVICE FOR YOUR REAL WORLD GOALS.<span style={{ fontSize: "0.78em", verticalAlign: "super", fontWeight: 700, marginLeft: "0.08em" }}>®</span>
        </p>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark & Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95 focus-visible:rounded-md"
          aria-label="Back to Basics with Big Ron Jones — Home"
          onClick={closeMobileMenu}
        >
          <img
            src="/ron/profiles-headshot.jpg"
            alt="Big Ron Jones"
            className="h-11 w-11 sm:h-12 sm:w-12 select-none rounded-full ring-2 ring-[#0A3161] object-cover object-center shadow-sm transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-heading text-2xl sm:text-3xl tracking-wider text-[#0A3161] uppercase leading-none">
              Back to Basics
            </span>
            <span className="font-mono text-[10px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#B31942] leading-tight flex items-center gap-1">
              WITH <BrandName variant="upper" />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main Navigation"
        >
          <a
            href={isHome ? "#watch" : "/#watch"}
            className="text-sm font-bold uppercase tracking-wider text-slate-700 transition-colors hover:text-[#0A3161] focus-visible:rounded-md"
          >
            Watch the Series
          </a>
          <a
            href={isHome ? "#about" : "/#about"}
            className="text-sm font-bold uppercase tracking-wider text-slate-700 transition-colors hover:text-[#0A3161] focus-visible:rounded-md"
          >
            Meet Big Ron Jones
          </a>
          <a
            href={isHome ? "#join" : "/#join"}
            className="text-sm font-bold uppercase tracking-wider text-slate-700 transition-colors hover:text-[#0A3161] focus-visible:rounded-md"
          >
            Join the List
          </a>
          <Link
            to="/chest-day/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A3161] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#08274d] hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-[#0A3161]"
          >
            <Play className="h-3.5 w-3.5 fill-current text-white" aria-hidden="true" />
            <span>Watch Episode 1</span>
          </Link>
        </nav>

        {/* Mobile menu trigger + prominent Watch Episode 1 button */}
        <div className="flex items-center gap-2.5 md:hidden">
          <Link
            to="/chest-day/"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0A3161] px-3.5 py-2 text-xs font-bold text-white shadow-sm"
          >
            <Play className="h-3 w-3 fill-current text-white" aria-hidden="true" />
            <span>Watch Ep. 1</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0A3161]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-5 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4">
            <a
              href={isHome ? "#watch" : "/#watch"}
              className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0A3161] py-1 border-b border-slate-100"
              onClick={closeMobileMenu}
            >
              Watch the Series
            </a>
            <a
              href={isHome ? "#about" : "/#about"}
              className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0A3161] py-1 border-b border-slate-100"
              onClick={closeMobileMenu}
            >
              Meet Big Ron Jones
            </a>
            <a
              href={isHome ? "#join" : "/#join"}
              className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0A3161] py-1 border-b border-slate-100"
              onClick={closeMobileMenu}
            >
              Join the List
            </a>
            <div className="pt-2">
              <Link
                to="/chest-day/"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A3161] py-3 text-sm font-bold text-white shadow-md active:bg-[#08274d]"
                onClick={closeMobileMenu}
              >
                <Play className="h-4 w-4 fill-current text-white" aria-hidden="true" />
                <span>Watch Episode 1 → /chest-day/</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
