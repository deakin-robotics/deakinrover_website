"use client";

import { useEffect } from "react";
import type { InstagramChild, InstagramMedia } from "@/lib/instagram";

export function previewImage(media: InstagramChild | InstagramMedia | undefined): string | undefined {
  if (!media) return undefined;
  if (media.media_type === "CAROUSEL_ALBUM") {
    const first = media.children?.data[0];
    return first ? previewImage(first) : media.media_url;
  }
  return media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
}

export function usePreloadImage(src: string | undefined) {
  useEffect(() => {
    if (!src) return;
    const image = new window.Image();
    image.src = src;
    return () => { image.onload = null; image.onerror = null; };
  }, [src]);
}
