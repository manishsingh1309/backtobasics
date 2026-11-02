import { ArrowRight, CheckCircle2, ClipboardCheck, Sparkles } from "lucide-react";
import BrandName from "@/components/shared/BrandName";
import { ASSESSMENT_URL, COACHING_URL } from "@/data/seriesData";

export function CoachingSection() {
  return (
    <section
      id="coaching"
      className="scroll-mt-24 border-t border-slate-200 bg-white py-16 sm:py-24"
      aria-labelledby="coaching-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Lead */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-[#0A3161] border border-blue-200/80 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#B31942]" />
            <span>TAKE YOUR TRAINING FURTHER</span>
          </div>

          <h2
            id="coaching-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#0A3161] uppercase tracking-wide leading-tight"
          >
            NEXT STEPS WITH <BrandName variant="upper" />
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Back to Basics gives you the fundamentals for free. When you are ready for a structured roadmap or individual oversight, explore the options below.
          </p>
        </div>

        {/* 2-Column High-Impact Conversion Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: FREE FITNESS ASSESSMENT */}
          <div
            id="assessment"
            className="relative flex flex-col justify-between rounded-2xl border-2 border-blue-100 bg-gradient-to-b from-[#eff6ff]/60 via-white to-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-[#0A3161]/40 hover:shadow-xl"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#0A3161] mb-5">
                <ClipboardCheck className="h-3.5 w-3.5" />
                <span>FREE 60-SECOND DIAGNOSTIC</span>
              </div>

              {/* Exact Heading Required by Ron's Checklist: NOT SURE WHERE TO START? */}
              <h3 className="font-heading text-3xl sm:text-4xl text-[#0A3161] uppercase tracking-wide leading-tight">
                NOT SURE WHERE TO START?
              </h3>

              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                Take our quick, confidential fitness assessment. Clarify your current training focus, conditioning level, available equipment, and schedule — and receive an immediate personalized recommendation suited for you.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0A3161] shrink-0" />
                  <span>100% Free — no credit card, no checkout required</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0A3161] shrink-0" />
                  <span>Clarifies home vs. gym training equipment setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#0A3161] shrink-0" />
                  <span>Pinpoints the right starting program for your goals</span>
                </li>
              </ul>
            </div>

            {/* Exact Button Required by Ron's Checklist: TAKE THE FREE ASSESSMENT */}
            <div className="mt-8 pt-6 border-t border-blue-100">
              <a
                href={ASSESSMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0A3161] px-6 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#08274d] hover:shadow-lg active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A3161]"
              >
                <span>TAKE THE FREE ASSESSMENT</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <p className="mt-2 text-center text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Direct link to BigRonJones.com/assessment
              </p>
            </div>
          </div>

          {/* Card 2: PREMIUM COACHING */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-[#B31942]/40 hover:shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#B31942] mb-5 border border-rose-200/60">
                <Sparkles className="h-3.5 w-3.5" />
                <span>INDIVIDUAL COACHING SERVICES</span>
              </div>

              {/* Exact Heading Required by Ron's Checklist: READY FOR MORE PERSONALIZED GUIDANCE? */}
              <h3 className="font-heading text-3xl sm:text-4xl text-[#0A3161] uppercase tracking-wide leading-tight">
                READY FOR MORE PERSONALIZED GUIDANCE?
              </h3>

              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                When you are ready to stop guessing and follow a proven plan, BigRonJones® provides structured, individual coaching for adults 35+. Receive customized training plans, nutrition support, weekly private Zoom oversight, and real daily accountability.
              </p>

              <ul className="mt-6 space-y-2.5 text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B31942] shrink-0" />
                  <span>Men’s Fitness Alliance™ & Women’s Wellness Coaching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B31942] shrink-0" />
                  <span>Weekly private Zoom oversight directly with Ron</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#B31942] shrink-0" />
                  <span>Custom training & nutrition adjusted to your schedule</span>
                </li>
              </ul>
            </div>

            {/* Exact Button Required by Ron's Checklist: EXPLORE COACHING PROGRAMS */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href={COACHING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#B31942] px-6 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-[#8e1032] hover:shadow-lg active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B31942]"
              >
                <span>EXPLORE COACHING PROGRAMS</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <p className="mt-2 text-center text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Explore services on BigRonJones.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
