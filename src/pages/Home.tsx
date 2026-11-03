import { Link } from "react-router-dom";
import { Play, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { EpisodeCard } from "@/components/common/EpisodeCard";
import { EmailSignupSection } from "@/components/common/EmailSignupSection";
import { CredibilityStrip } from "@/components/common/CredibilityStrip";
import { HisAndHerSection } from "@/components/home/HisAndHerSection";
import { CoachingSection } from "@/components/home/CoachingSection";
import BrandName from "@/components/shared/BrandName";
import { EPISODES, PLAYLIST_URL, CHANNEL_URL } from "@/data/seriesData";
import { trackYouTubeOutboundClick, trackWatchEpisodeClick } from "@/lib/analytics";

export default function Home() {
  return (
    <>
      <SEO
        title="Back to Basics with Big Ron | Official Workout Series"
        description="Watch BigRonJones®’ four part Back to Basics workout series for chest, back and shoulders, legs, and arms. Join his email list for training content."
        canonicalPath="/"
      />

      {/* Hero Section — Signature BigRonJones® Dark Cinematic Athletic Luxury */}
      <section className="relative overflow-hidden bg-[#070A10] py-16 sm:py-24 lg:py-28 border-b border-slate-900">
        {/* Ambient Brand Blue Glow behind headline */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full z-0 opacity-80"
          style={{
            background: "radial-gradient(circle, rgba(10, 49, 97, 0.48) 0%, rgba(10, 49, 97, 0.15) 50%, transparent 70%)",
            filter: "blur(85px)",
          }}
          aria-hidden="true"
        />

        {/* Ambient Brand Red Glow in bottom right */}
        <div
          className="pointer-events-none absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full z-0 opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(179, 25, 66, 0.3) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          aria-hidden="true"
        />

        {/* Desktop Widescreen Hero Image with Big Ron Jones, American Flag & Gym Action (>= 1024px) */}
        <div className="hidden lg:block absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden z-10">
          <picture>
            <source type="image/webp" srcSet="/brand/hero.webp" />
            <img
              src="/brand/hero.png"
              alt="Back to Basics with BigRonJones®"
              className="h-full w-full object-cover object-[82%_center] xl:object-[80%_center] select-none opacity-90"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          {/* Feathered scrim over left text column to ensure 100% crisp text readability */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[62%] xl:w-[56%] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #070A10 0%, #070A10 32%, rgba(7, 10, 16, 0.95) 48%, rgba(7, 10, 16, 0.7) 68%, rgba(7, 10, 16, 0.2) 88%, transparent 100%)",
            }}
          />
          {/* Soft bottom vignette to melt into next section */}
          <div
            className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
            style={{
              background: "linear-gradient(to top, #070A10 0%, rgba(7, 10, 16, 0.8) 45%, transparent 100%)",
            }}
          />
          {/* Subtle top blend for navbar clearance */}
          <div
            className="absolute top-0 inset-x-0 h-20 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #070A10 0%, rgba(7, 10, 16, 0.5) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Mobile & Tablet Hero Visual Background Atmosphere (< 1024px) */}
        <div className="block lg:hidden absolute inset-0 h-full w-full pointer-events-none select-none overflow-hidden z-10 opacity-30">
          <picture>
            <source type="image/webp" srcSet="/brand/hero.webp" />
            <img
              src="/brand/hero.png"
              alt="BigRonJones®"
              className="h-full w-full object-cover object-[75%_center] select-none"
              loading="eager"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/75 via-[#070A10]/90 to-[#070A10]" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl text-center lg:text-left">
            {/* Eyebrow badge with signature crimson accent */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-block w-8 h-[2px] bg-[#B31942]" />
              <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#B31942] uppercase">
                OFFICIAL 4 PART WORKOUT SERIES
              </span>
            </div>

            {/* Wordmark / H1 */}
            <h1 className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.94]">
              Back to Basics <br />
              <span className="text-[#38bdf8] drop-shadow-sm">
                with <BrandName variant="upper" />
              </span>
            </h1>

            {/* Subtitle verbatim */}
            <p className="mt-5 text-xl sm:text-2xl font-bold tracking-tight text-white">
              Build muscle. Make the basics count.
            </p>

            {/* Intro verbatim */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              You don’t need to make training more complicated to take it seriously. Join me for a four part workout series covering chest, back and shoulders, legs, and arms. Watch the videos, learn from the demonstrations, and bring a clear focus to your next workout.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                to="/chest-day/"
                onClick={() => trackWatchEpisodeClick(1, "Episode 1: Chest Day")}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#B31942] px-8 py-3.5 text-base sm:text-lg font-bold text-white shadow-xl shadow-red-900/35 transition-all hover:bg-[#8e1032] hover:shadow-2xl active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B31942]"
              >
                <Play className="h-5 w-5 fill-current text-white" aria-hidden="true" />
                <span>Watch Episode 1</span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>

              <a
                href="https://bigronjones.com/assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-white/10 backdrop-blur-md px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-white/15 hover:border-slate-500"
              >
                <span className="h-2 w-2 rounded-full bg-[#B31942] animate-pulse" />
                <span>Take Free Assessment →</span>
              </a>

              <a
                href="#join"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-bold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              >
                Join the Email List
              </a>
            </div>

            {/* Trust Subtext */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono font-medium text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="h-4 w-4 text-[#38bdf8]" />
                20+ Years Coaching
              </span>
              <span>•</span>
              <span>4 Free Complete Sessions</span>
              <span>•</span>
              <span>No Subscription Required</span>
            </div>

            {/* Mobile & iPhone Dedicated Hero Visual Card (< 1024px) */}
            <div className="lg:hidden mt-8 w-full max-w-lg mx-auto sm:max-w-xl">
              <Link
                to="/chest-day/"
                onClick={() => trackWatchEpisodeClick(1, "Hero Mobile Card - Episode 1")}
                className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0c1322] shadow-2xl shadow-blue-950/60 transition-transform active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                aria-label="Watch Back to Basics Series Episode 1"
              >
                <picture>
                  <source type="image/webp" srcSet="/brand/hero.webp" />
                  <img
                    src="/brand/hero.png"
                    alt="Back to Basics with BigRonJones®"
                    className="h-full w-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-colors">
                  <div className="flex h-13 w-13 sm:h-15 sm:w-15 items-center justify-center rounded-full bg-[#0A3161]/90 text-white shadow-2xl border-2 border-white/30 backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 sm:h-7 sm:w-7 fill-current text-white ml-0.5" aria-hidden="true" />
                  </div>
                </div>

                {/* Floating Bottom Glass Banner */}
                <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-[#070A10]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#B31942] animate-pulse" />
                    <span>START WATCHING FREE</span>
                  </span>
                  <span className="text-[#38bdf8]">Episode 1: Chest Day →</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <CredibilityStrip />

      {/* Series Section / #watch */}
      <section
        id="watch"
        className="scroll-mt-24 py-16 sm:py-24 bg-white"
        aria-labelledby="watch-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2
              id="watch-heading"
              className="font-heading text-4xl sm:text-5xl text-[#0A3161] uppercase tracking-wide"
            >
              Your Back to Basics workout series
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Start with chest day and work through the series, or choose the episode you want to watch below.
            </p>
          </div>

          {/* Four Real Video Cards with visible episode numbers */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {EPISODES.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {/* Playlist Link (verbatim text: Watch the Full Series on YouTube) */}
          <div className="mt-12 text-center">
            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackYouTubeOutboundClick("playlist", PLAYLIST_URL)}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#0A3161] bg-white px-7 py-3 text-sm font-bold text-[#0A3161] transition-all hover:bg-[#eff6ff] hover:shadow"
            >
              <span>Watch the Full Series on YouTube</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* His & Her Workout Collection - Directly below original four-part series */}
      <HisAndHerSection />

      {/* Free Fitness Assessment & Premium Coaching Section - Below free workout content */}
      <CoachingSection />

      {/* Meet Big Ron / #about */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-slate-100 bg-slate-50 py-16 sm:py-24"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Approved portrait photo */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-white p-3 shadow-xl border border-slate-200">
                <img
                  src="/ron/meetbigronjones.png"
                  alt="BigRonJones®"
                  loading="lazy"
                  className="h-auto w-full rounded-xl object-cover"
                />
                <div className="mt-4 px-3 py-2 text-center border-t border-slate-100">
                  <p className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide">
                    <BrandName variant="upper" />
                  </p>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#B31942] font-bold">
                    FOUNDER & HEAD COACH
                  </p>
                  <p className="mt-1 text-[11px] font-mono text-slate-500">
                    BigRonJonesLLC · Hahira, GA 31632
                  </p>
                </div>
              </div>
            </div>

            {/* Content verbatim */}
            <div className="lg:col-span-7 order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/70 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#0A3161] mb-4">
                THE COACH & PHILOSOPHY
              </div>

              <h2
                id="about-heading"
                className="font-heading text-4xl sm:text-5xl text-[#0A3161] uppercase tracking-wide flex items-center justify-center lg:justify-start gap-2 flex-wrap"
              >
                <span>Meet</span> <BrandName variant="upper" />
              </h2>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                {/* I’m BigRonJones®. */}
                <p>
                  I’m <BrandName variant="mixed" />. My approach is practical: understand the basics, train with purpose, and build habits you can keep. Back to Basics gives you a look at how I train and explain the work. Start with an episode, then stay connected for more training content.
                </p>
              </div>

              {/* Coaching pillars */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                <div className="rounded-lg bg-white border border-slate-200 p-3 shadow-xs">
                  <p className="font-mono text-xs font-bold text-[#0A3161] uppercase tracking-wider">Experience</p>
                  <p className="text-sm text-slate-700 font-medium mt-0.5">20+ Years Coaching Adults 35+</p>
                </div>
                <div className="rounded-lg bg-white border border-slate-200 p-3 shadow-xs">
                  <p className="font-mono text-xs font-bold text-[#0A3161] uppercase tracking-wider">Direct Access</p>
                  <a
                    href="mailto:Coaching@BigRonJones.com"
                    className="text-sm text-[#0A3161] hover:text-[#B31942] font-medium mt-0.5 block truncate"
                  >
                    Coaching@BigRonJones.com
                  </a>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackYouTubeOutboundClick("channel", CHANNEL_URL)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#B31942] px-7 py-3.5 text-base font-bold text-white shadow transition-colors hover:bg-[#8e1032]"
                >
                  <span>Visit My YouTube Channel</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>

                <Link
                  to="/chest-day/"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-slate-800 transition-colors hover:border-[#0A3161] hover:text-[#0A3161]"
                >
                  Start With Episode 1
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section / #join */}
      <EmailSignupSection pageContext="homepage" />
    </>
  );
}
