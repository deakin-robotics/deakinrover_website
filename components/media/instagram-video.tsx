"use client";

import { useContext, useEffect, useRef } from "react";
import { FeedFocusedContext } from "./feed-context";

type InstagramVideoProps = {
  src: string;
  poster?: string;
  username: string;
};

export function InstagramVideo({ src, poster, username }: InstagramVideoProps) {
  const focused = useContext(FeedFocusedContext);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!focused) {
      video.pause();
      video.muted = false;
      return;
    }

    // Muted playback is allowed by browsers' autoplay policies.
    video.muted = true;
    void video.play().catch(() => {
      // Keep the native controls available if playback is blocked or unavailable.
    });

    return () => video.pause();
  }, [focused]);

  return <video ref={videoRef} src={src} poster={poster} controls playsInline preload="none" aria-label={`${username} video post`} />;
}
