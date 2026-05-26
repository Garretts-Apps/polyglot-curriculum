'use client';

import type { VideoResource } from '@/curriculum/types';

interface VideoPlayerProps {
  video: VideoResource;
  accentColor: string;
}

export function VideoPlayer({ video, accentColor }: VideoPlayerProps) {
  const embedUrl = video.isPlaylist
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${video.youtubeId}`
    : `https://www.youtube-nocookie.com/embed/${video.youtubeId}`;

  return (
    <div
      className="border font-mono text-xs overflow-hidden rounded-md shadow-lg"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--bg-elevated)',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b select-none"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg-overlay)',
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Retro terminal dots */}
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-error)] opacity-80 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-warn)] opacity-80 shrink-0" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-prompt)] opacity-80 shrink-0" />
          <span className="ml-2 font-semibold text-[var(--fg-muted)] truncate">
            mpv --vo=gpu youtube.com/watch?v={video.youtubeId}
          </span>
        </div>
        <div className="text-[10px] text-[var(--fg-dim)] shrink-0 hidden sm:block">
          [mpv-tui v0.35.0]
        </div>
      </div>

      {/* Video Iframe Box */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>

      {/* Status / Control Bar */}
      <div
        className="border-t px-3 py-2.5 grid grid-cols-1 md:grid-cols-3 gap-2"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg-overlay)',
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase shrink-0"
            style={{
              backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
              color: accentColor,
            }}
          >
            Playing
          </span>
          <span className="truncate text-[var(--fg)] font-semibold" title={video.title}>
            {video.title}
          </span>
        </div>

        <div className="flex items-center md:justify-center text-[var(--fg-muted)] min-w-0">
          <span className="text-[var(--fg-dim)] mr-1 shrink-0">channel:</span>
          <span className="text-[var(--fg)] truncate">{video.channelName}</span>
        </div>

        <div className="flex items-center md:justify-end gap-3 text-[var(--fg-dim)] flex-wrap">
          {video.duration && (
            <span>
              <span className="mr-1">length:</span>
              <span className="text-[var(--fg)]">{video.duration}</span>
            </span>
          )}
          <span>
            <span>vol:</span> <span className="text-[var(--fg)]">100%</span>
          </span>
          <span>
            <span>speed:</span> <span className="text-[var(--fg)]">1.0x</span>
          </span>
        </div>
      </div>
    </div>
  );
}
