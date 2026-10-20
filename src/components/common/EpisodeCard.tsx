import { Link } from "react-router-dom";
import { Play, Clock } from "lucide-react";
import { Episode } from "@/data/seriesData";
import { trackWatchEpisodeClick } from "@/lib/analytics";

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const handleClick = () => {
    trackWatchEpisodeClick(episode.id, episode.title);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0A3161]/40 hover:shadow-lg">
      {/* Thumbnail with visible episode badge and duration overlay */}
      <Link
        to={episode.path}
        onClick={handleClick}
        className="relative aspect-video w-full overflow-hidden bg-slate-900"
        aria-label={`Watch ${episode.title}`}
      >
        <img
          src={episode.thumbnail}
          alt={`${episode.title} thumbnail`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Visible Episode Number Badge (as required by brief) */}
        <div className="absolute top-3 left-3 rounded-md bg-[#0A3161] px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md">
          EPISODE {episode.id}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-xs font-mono font-medium text-white backdrop-blur-sm">
          <Clock className="h-3 w-3 text-slate-300" aria-hidden="true" />
          <span>{episode.durationFormatted}</span>
        </div>

        {/* Center Hover Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B31942] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 fill-current pl-1 text-white" aria-hidden="true" />
          </div>
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Card Title (exact title required by brief) */}
          <h3 className="font-heading text-2xl text-[#0A3161] transition-colors group-hover:text-[#B31942]">
            <Link to={episode.path} onClick={handleClick}>
              {episode.title}
            </Link>
          </h3>

          {/* Quick summary cues */}
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
            {episode.summary}
          </p>

          {/* Movements badge preview */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {episode.movements.slice(0, 3).map((movement, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700"
              >
                {movement}
              </span>
            ))}
            {episode.movements.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                +{episode.movements.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Card Button (exact copy required by brief: "Watch Episode") */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            to={episode.path}
            onClick={handleClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A3161] py-2.5 px-4 text-sm font-bold text-white transition-all hover:bg-[#08274d] group-hover:shadow"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Watch Episode
          </Link>
        </div>
      </div>
    </div>
  );
}
