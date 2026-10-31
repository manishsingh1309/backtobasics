import { Award, Users, Video, Target, Dumbbell, Mail } from "lucide-react";

/**
 * CREDIBILITY STRIP — Official BigRonJones® Trust Architecture
 * Displays 6 key pillars that communicate athletic authority and trust.
 */
const credibilityPoints = [
  {
    icon: Award,
    label: "20+ YEARS COACHING EXPERIENCE",
  },
  {
    icon: Target,
    label: "PRACTICAL ADVICE · NO FADS",
  },
  {
    icon: Video,
    label: "4 COMPLETE WORKOUT SESSIONS",
  },
  {
    icon: Dumbbell,
    label: "CHEST · BACK · LEGS · ARMS",
  },
  {
    icon: Users,
    label: "REAL WORLD COACHING PHILOSOPHY",
  },
  {
    icon: Mail,
    label: "DIRECT EMAIL UPDATES FROM RON",
  },
];

export function CredibilityStrip() {
  return (
    <section
      aria-label="BigRonJones Coaching Standards"
      className="relative bg-white border-y border-slate-200 py-8 sm:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {credibilityPoints.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 text-center group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#0A3161] ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-[#0A3161] group-hover:text-white group-hover:shadow-md">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <p className="font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.16em] leading-tight text-slate-800">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
