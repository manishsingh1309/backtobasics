import { Link } from "react-router-dom";
import { Play, ArrowRight, ExternalLink, Dumbbell } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { EpisodeCard } from "@/components/common/EpisodeCard";
import { EmailSignupSection } from "@/components/common/EmailSignupSection";
import BrandName from "@/components/shared/BrandName";
import { EPISODES, PLAYLIST_URL, CHANNEL_URL } from "@/data/seriesData";
import { trackYouTubeOutboundClick, trackWatchEpisodeClick } from "@/lib/analytics";

export default function Home() {
  return (
    <>
      <SEO
        title="Back to Basics with Big Ron | Official Workout Series"
        description="Watch Big Ron Jones’ four-part Back to Basics workout series for chest, back and shoulders, legs, and arms. Join his email list for training content."
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24 lg:py-28 border-b border-slate-100">
        {/* Subtle decorative athletic grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-25 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0A3161 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left copy column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-[#0A3161] border border-blue-200/70 mb-6 shadow-sm">
                <Dumbbell className="h-3.5 w-3.5 text-[#B31942]" />
                <span>OFFICIAL 4-PART WORKOUT SERIES</span>
              </div>

              {/* Wordmark / H1 (Single H1 on page verbatim) */}
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#0A3161] uppercase leading-[0.95]">
                Back to Basics <br />
                <span className="text-[#B31942]">with Big Ron</span>
              </h1>

              {/* Subtitle verbatim */}
              <p className="mt-5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Build muscle. Make the basics count.
              </p>

              {/* Intro verbatim */}
              <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                You don’t need to make training more complicated to take it seriously. Join me for a four-part workout series covering chest, back and shoulders, legs, and arms. Watch the videos, learn from the demonstrations, and bring a clear focus to your next workout.
              </p>

              {/* Action Buttons: Prominent Watch Episode 1 on mobile + Secondary Join List */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/chest-day/"
                  onClick={() => trackWatchEpisodeClick(1, "Episode 1: Chest Day")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0A3161] px-8 py-4 text-base sm:text-lg font-bold text-white shadow-lg transition-all hover:bg-[#08274d] hover:shadow-xl active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A3161]"
                >
                  <Play className="h-5 w-5 fill-current text-white" aria-hidden="true" />
                  <span>Watch Episode 1</span>
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>

                <a
                  href="#join"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-slate-800 transition-colors hover:border-[#0A3161] hover:text-[#0A3161]"
                >
                  Join the Email List
                </a>
              </div>
            </div>

            {/* Right visual featured card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-white p-2.5 shadow-2xl ring-1 ring-slate-900/10 border border-slate-100">
                <Link
                  to="/chest-day/"
                  onClick={() => trackWatchEpisodeClick(1, "Episode 1: Chest Day")}
                  className="group relative block aspect-video overflow-hidden rounded-xl bg-slate-900"
                >
                  <img
                    src="/thumbnails/ep1-chest.jpg"
                    alt="Back to Basics Episode 1: Chest Day"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 rounded bg-[#0A3161] px-2.5 py-1 text-xs font-mono font-bold text-white uppercase tracking-wider">
                    START HERE • EPISODE 1
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B31942] text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-7 w-7 fill-current pl-1" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-heading text-xl">Episode 1: Chest Day</p>
                    <p className="text-xs text-slate-300 font-mono">5 Exercises to Build Your Chest (9:59)</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  alt="Big Ron Jones"
                  loading="lazy"
                  className="h-auto w-full rounded-xl object-cover"
                />
                <div className="mt-3 px-3 py-2 text-center border-t border-slate-100">
                  <p className="font-heading text-2xl text-[#0A3161] uppercase tracking-wide">
                    Big Ron Jones
                  </p>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#B31942]">
                    <BrandName variant="upper" />
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
                className="font-heading text-4xl sm:text-5xl text-[#0A3161] uppercase tracking-wide"
              >
                Meet Big Ron Jones
              </h2>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p>
                  I’m Big Ron Jones. My approach is practical: understand the basics, train with purpose, and build habits you can keep. Back to Basics gives you a look at how I train and explain the work. Start with an episode, then stay connected for more training content.
                </p>
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
