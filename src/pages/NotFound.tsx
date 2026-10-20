import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { SEO } from "@/components/common/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Back to Basics with Big Ron"
        description="The page you are looking for does not exist. Return to Back to Basics with Big Ron."
      />

      <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 py-16 text-center">
        <span className="font-mono text-sm font-bold uppercase tracking-widest text-[#B31942]">
          404 ERROR
        </span>
        <h1 className="mt-3 font-heading text-5xl sm:text-6xl text-[#0A3161] uppercase tracking-wide">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-slate-600">
          The page you requested could not be found. Start with chest day or return to the main series.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:border-[#0A3161] hover:text-[#0A3161] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/chest-day/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0A3161] px-6 py-3 text-sm font-bold text-white shadow hover:bg-[#08274d] transition"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Watch Episode 1</span>
          </Link>
        </div>
      </div>
    </>
  );
}
