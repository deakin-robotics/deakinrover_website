"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { InstagramChild } from "@/lib/instagram";
import { InstagramVideo } from "./instagram-video";

export function InstagramCarousel({ items, username }: { items: InstagramChild[]; username: string }) {
  const [index, setIndex] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const item = items[index];
  if (!item) return null;
  return <div className="instagram-carousel" onTouchStart={(event) => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => {
    if (!start.current) return;
    const x = event.changedTouches[0].clientX - start.current.x;
    const y = event.changedTouches[0].clientY - start.current.y;
    start.current = null;
    if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) setIndex((current) => Math.max(0, Math.min(items.length - 1, current + (x < 0 ? 1 : -1))));
  }}>
    {item.media_type === "VIDEO" && item.media_url ? <InstagramVideo key={item.id} src={item.media_url} poster={item.thumbnail_url} username={username} /> : item.media_url ? <Image src={item.media_url} alt={`Instagram carousel image ${index + 1}`} fill sizes="(max-width: 850px) 88vw, 700px" unoptimized /> : <p className="instagram-media-unavailable">Media unavailable. View this post on Instagram.</p>}
    {index > 0 && <button className="carousel-arrow carousel-arrow--previous" type="button" aria-label="Previous slide" onClick={() => setIndex(index - 1)}>‹</button>}
    {index < items.length - 1 && <button className="carousel-arrow carousel-arrow--next" type="button" aria-label="Next slide" onClick={() => setIndex(index + 1)}>›</button>}
    {items.length > 1 && <span className="carousel-count">{index + 1} / {items.length}</span>}
  </div>;
}
