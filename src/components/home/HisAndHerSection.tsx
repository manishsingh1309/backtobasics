import { useState } from "react";
import { Play, Clock, ExternalLink, X, Users2 } from "lucide-react";
import { HIS_AND_HER_VIDEOS, HIS_AND_HER_PLAYLIST_URL, BonusVideo } from "@/data/seriesData";
import { trackYouTubeOutboundClick } from "@/lib/analytics";
import BrandName from "@/components/shared/BrandName";

export function HisAndHerSection() {
  const [activeVideo, setActiveVideo] = useState<BonusVideo | null>(null);

  return (
    <section
      id="his-and-her"
      className="scroll-mt-24 border-t border-slate-200 bg-slate-50/70 py-16 sm:py-24"
      aria-labelledby="his-and-her-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-[#0A3161] border border-blue-200/80 mb-4 shadow-xs">
            <Users2 className="h-3.5 w-3.5 text-[#B31942]" />
            <span>PARTNER & COUPLE TRAINING</span>
          </div>

          <h2
            id="his-and-her-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#0A3161] uppercase tracking-wide leading-tight"
          >
            HIS & HER WORKOUT ROUTINE <br className="hidden sm:inline" />
            <span className="text-[#B31942]">| <BrandName variant="mixed" /> & Sue</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Train side by side. Watch Ron and Sue demonstrate real world exercise variations, proper setup adjustments for height and strength differences, and form cues for back, shoulders, triceps, and biceps.
          </p>
        </div>

        {/* 4 Video Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HIS_AND_HER_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0A3161]/50 hover:shadow-xl"
            >
              {/* Thumbnail with overlay & play trigger */}
              <button
                type="button"
                onClick={() => {
                  trackYouTubeOutboundClick("video", video.videoUrl);
                  setActiveVideo(video);
                }}
                className="relative aspect-video w-full overflow-hidden bg-slate-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3161]"
                aria-label={`Play ${video.title}`}
              >
                <img
                  src={video.thumbnail}
                  alt={`${video.title} thumbnail`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {/* Focus Badge */}
                <div className="absolute top-3 left-3 rounded-md bg-[#0A3161] px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white shadow-sm">
                  {video.focus}
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-xs font-mono font-medium text-white backdrop-blur-xs">
                  <Clock className="h-3 w-3 text-slate-300" aria-hidden="true" />
                  <span>{video.durationFormatted}</span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B31942] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-6 w-6 fill-current pl-1 text-white" aria-hidden="true" />
                  </div>
                </div>
              </button>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-heading text-xl text-[#0A3161] transition-colors group-hover:text-[#B31942] leading-snug">
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className="text-left hover:underline focus:outline-none"
                    >
                      {video.title}
                    </button>
                  </h3>

                  <p className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    {video.subtitle}
                  </p>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {video.summary}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A3161] py-2 px-3 text-xs font-bold text-white transition-all hover:bg-[#08274d] shadow-xs"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    Watch Video
                  </button>

                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackYouTubeOutboundClick("video", video.videoUrl)}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-600 hover:border-[#0A3161] hover:text-[#0A3161] transition-colors"
                    title="Open on YouTube"
                    aria-label={`Open ${video.title} on YouTube`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Playlist Link Button */}
        <div className="mt-12 text-center">
          <a
            href={HIS_AND_HER_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackYouTubeOutboundClick("playlist", HIS_AND_HER_PLAYLIST_URL)}
            className="inline-flex items-center gap-2.5 rounded-lg border-2 border-[#0A3161] bg-white px-7 py-3.5 text-sm font-bold text-[#0A3161] transition-all hover:bg-[#eff6ff] hover:shadow-md"
          >
            <span>Watch the Full His & Her Playlist on YouTube</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Embedded Video Player Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-slate-900 p-3 sm:p-5 shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 text-white">
              <div className="pr-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B31942]">
                  His & Her Workout Routine • BigRonJones® & Sue
                </span>
                <h3 id="video-modal-title" className="font-heading text-lg sm:text-2xl text-white truncate">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Close video player"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Embedded 16:9 Player */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-inner">
              <iframe
                src={`${activeVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            {/* Modal Footer */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Duration: {activeVideo.durationFormatted}</span>
              <a
                href={activeVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#93c5fd] hover:underline inline-flex items-center gap-1"
              >
                Open on YouTube <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
