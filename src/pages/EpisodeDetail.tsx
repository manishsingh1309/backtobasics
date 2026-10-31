import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Mail,
  CheckCircle,
  Clock,
  ListOrdered,
} from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { EmailSignupSection } from "@/components/common/EmailSignupSection";
import { Episode } from "@/data/seriesData";
import { trackYouTubeOutboundClick, trackWatchEpisodeClick } from "@/lib/analytics";

interface EpisodeDetailProps {
  episode: Episode;
}

export default function EpisodeDetail({ episode }: EpisodeDetailProps) {
  return (
    <>
      <SEO
        title={episode.seoTitle}
        description={episode.seoDescription}
        canonicalPath={episode.path}
        episode={episode}
      />

      <article className="min-h-screen bg-white">
        {/* Top breadcrumb / navigation container */}
        <div className="border-b border-slate-100 bg-slate-50/70 py-4">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link
              to="/#watch"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#0A3161] focus-visible:rounded-md"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to the Series</span>
            </Link>
          </div>
        </div>

        {/* Main Episode Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          {/* Header & Exact Intro */}
          <header className="mb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#B31942] mb-2">
              <span>Back to Basics with Big Ron Jones®</span>
              <span>•</span>
              <span>Episode {episode.id} of 4</span>
            </div>

            {/* H1 (Exact card / H1 title required) */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#0A3161] uppercase tracking-wide">
              {episode.h1}
            </h1>

            {/* Exact Episode Introduction Copy */}
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
              {episode.intro}
            </p>
          </header>

          {/* Responsive Video Player (prominent near top, 16:9, accessible title, full-screen) */}
          <section className="mb-6" aria-label="Episode Video Player">
            <div className="video-responsive-container shadow-2xl ring-1 ring-slate-900/10">
              <iframe
                src={`${episode.embedUrl}?rel=0&modestbranding=1&playsinline=1`}
                title={`${episode.h1} - Back to Basics with Big Ron Jones`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="eager"
                className="w-full h-full"
              />
            </div>
          </section>

          {/* Watch on YouTube Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-2 border-b border-slate-200 text-sm text-slate-600 mb-12">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>Duration: {episode.durationFormatted}</span>
            </div>

            <a
              href={episode.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackYouTubeOutboundClick("video", episode.videoUrl)}
              className="inline-flex items-center gap-1.5 font-semibold text-[#0A3161] hover:text-[#B31942] transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Reviewed Notes Section (Concise summary, exercises demonstrated, cues, and timestamps) */}
          <section
            className="mb-14 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8"
            aria-labelledby="notes-heading"
          >
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
              <ListOrdered className="h-5 w-5 text-[#0A3161]" />
              <h2
                id="notes-heading"
                className="font-heading text-2xl sm:text-3xl text-[#0A3161] uppercase tracking-wide"
              >
                Reviewed Training Notes & Exercises
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {episode.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Movements Demonstrated */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  MOVEMENTS DEMONSTRATED
                </h3>
                <ul className="space-y-2.5">
                  {episode.movements.map((movement, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800">
                      <CheckCircle className="h-4 w-4 text-[#B31942] shrink-0 mt-0.5" />
                      <span className="font-medium">{movement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Chapters / Timestamps */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                  VIDEO CHAPTERS & TIMESTAMPS
                </h3>
                <div className="space-y-2">
                  {episode.chapters.map((chap, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between rounded-md bg-white p-2 text-xs border border-slate-200/70"
                    >
                      <span className="font-medium text-slate-800">{chap.title}</span>
                      <span className="font-mono font-semibold text-[#0A3161] ml-2 shrink-0">
                        {chap.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Episode Navigation: Explicit previous / next step */}
          <nav
            className="border-t border-slate-200 pt-8 mb-16"
            aria-label="Episode Pagination"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Previous Link */}
              <div>
                {episode.previousLink.href.startsWith("/#") ? (
                  <Link
                    to={episode.previousLink.href}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-[#0A3161] hover:text-[#0A3161] transition"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{episode.previousLink.label}</span>
                  </Link>
                ) : (
                  <Link
                    to={episode.previousLink.href}
                    onClick={() => trackWatchEpisodeClick(episode.id - 1, episode.previousLink.label)}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:border-[#0A3161] hover:text-[#0A3161] transition"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{episode.previousLink.label}</span>
                  </Link>
                )}
              </div>

              {/* Episode 4 Additional CTA: Join Big Ron's List */}
              {episode.alsoShowsJoinList && (
                <div className="flex justify-center">
                  <a
                    href="#join"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-2 border-[#0A3161] bg-[#eff6ff] px-5 py-3 text-sm font-bold text-[#0A3161] hover:bg-blue-100 transition"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Join Big Ron’s List</span>
                  </a>
                </div>
              )}

              {/* Primary Next Action */}
              <div>
                {episode.nextLink.href.startsWith("/#") ? (
                  <Link
                    to={episode.nextLink.href}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#0A3161] px-6 py-3 text-sm font-bold text-white shadow hover:bg-[#08274d] transition"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{episode.nextLink.label}</span>
                  </Link>
                ) : (
                  <Link
                    to={episode.nextLink.href}
                    onClick={() => trackWatchEpisodeClick(episode.id + 1, episode.nextLink.label)}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#0A3161] px-6 py-3 text-sm font-bold text-white shadow hover:bg-[#08274d] transition"
                  >
                    <span>{episode.nextLink.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Email Signup Section */}
        <EmailSignupSection pageContext={episode.slug} />
      </article>
    </>
  );
}
