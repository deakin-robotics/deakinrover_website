"use client";

import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import type { InstagramChild } from "@/lib/instagram";
import { FeedFocusedContext, MediaPreloadContext } from "./feed-context";
import { InstagramVideo } from "./instagram-video";
import { previewImage, usePreloadImage } from "./use-preload-image";

function Slide({ item, index, username }: { item: InstagramChild; index: number; username: string }) {
  return item.media_type === "VIDEO" && item.media_url ? <InstagramVideo src={item.media_url} poster={item.thumbnail_url} username={username} /> : item.media_url ? <Image src={item.media_url} alt={`Instagram carousel image ${index + 1}`} fill sizes="(max-width: 850px) 88vw, 700px" unoptimized /> : <p className="instagram-media-unavailable">Media unavailable. View this post on Instagram.</p>;
}

export function InstagramCarousel({ items, username }: { items: InstagramChild[]; username: string }) {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<{ index: number; direction: 1 | -1 } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preload = useContext(MediaPreloadContext);
  usePreloadImage(preload ? previewImage(items[index + 1]) : undefined);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function move(direction: 1 | -1) {
    const next = index + direction;
    if (next < 0 || next >= items.length || outgoing) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutgoing({ index, direction });
      timer.current = setTimeout(() => { setOutgoing(null); timer.current = null; }, 300);
    }
    setIndex(next);
  }

  const item = items[index];
  if (!item) return null;
  return <div className="instagram-carousel" onTouchStart={(event) => { start.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => {
    if (!start.current) return;
    const x = event.changedTouches[0].clientX - start.current.x;
    const y = event.changedTouches[0].clientY - start.current.y;
    start.current = null;
    if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) move(x < 0 ? 1 : -1);
  }}>
    {outgoing && <div className={`carousel-slide carousel-slide--out-${outgoing.direction === 1 ? "next" : "previous"}`} aria-hidden="true" inert><FeedFocusedContext.Provider value={false}><Slide item={items[outgoing.index]} index={outgoing.index} username={username} /></FeedFocusedContext.Provider></div>}
    <div key={item.id} className={`carousel-slide${outgoing ? ` carousel-slide--in-${outgoing.direction === 1 ? "next" : "previous"}` : ""}`}><Slide item={item} index={index} username={username} /></div>
    {index > 0 && <button className="carousel-arrow carousel-arrow--previous" type="button" aria-label="Previous slide" onClick={() => move(-1)}>‹</button>}
    {index < items.length - 1 && <button className="carousel-arrow carousel-arrow--next" type="button" aria-label="Next slide" onClick={() => move(1)}>›</button>}
    {items.length > 1 && <span className="carousel-count">{index + 1} / {items.length}</span>}
  </div>;
}
