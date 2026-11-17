"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { InstagramMedia, InstagramPage } from "@/lib/instagram";
import { FeedFocus } from "./feed-focus";
import { FeedFocusedContext } from "./feed-context";
import { InstagramPost } from "./instagram-post";

function Post({ post, profilePicture }: { post: InstagramMedia; profilePicture?: string }) {
  return <InstagramPost username="deakinrobotics" profilePicture={profilePicture}
    image={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
    video={post.media_type === "VIDEO" ? post.media_url : undefined}
    carouselItems={post.children?.data} caption={post.caption ?? ""} date={post.timestamp.slice(0, 10)} postUrl={post.permalink} />;
}

export function ReelFeed({ initialPage, profilePicture }: { initialPage: InstagramPage | null; profilePicture?: string }) {
  const [posts, setPosts] = useState(initialPage?.posts ?? []);
  const [cursor, setCursor] = useState(initialPage?.nextCursor ?? null);
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<{ post: InstagramMedia; direction: 1 | -1 } | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const inFlight = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadMore = useCallback(async () => {
    if (!cursor || inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch(`/api/instagram?after=${encodeURIComponent(cursor)}`);
      if (!response.ok) throw new Error("Unable to load posts");
      const page: InstagramPage = await response.json();
      setPosts((current) => [...current, ...page.posts.filter((post) => !current.some((item) => item.id === post.id))]);
      setCursor(page.nextCursor === cursor ? null : page.nextCursor);
    } catch {
      setFailed(true);
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, [cursor]);

  useEffect(() => {
    if (!cursor || failed || index < posts.length - 2) return;
    const timeout = setTimeout(() => void loadMore(), 0);
    return () => clearTimeout(timeout);
  }, [cursor, failed, index, loadMore, posts.length]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const move = useCallback((direction: 1 | -1) => {
    const next = index + direction;
    if (next < 0 || next >= posts.length || outgoing) return;
    setOutgoing({ post: posts[index], direction });
    setIndex(next);
    if (direction === 1 && cursor && !failed && next >= posts.length - 2) void loadMore();
    timer.current = setTimeout(() => { setOutgoing(null); timer.current = null; }, 350);
  }, [cursor, failed, index, loadMore, outgoing, posts]);

  const post = posts[index];
  return <FeedFocus hasPost={Boolean(post)} postIndex={index} onMove={move}>
    <div className="media-back page-section"><Link className="back-link" href="/">← Home</Link><h1>Club <span>Feed</span></h1></div>
    <section className="media-feed page-section" aria-label="Social media feed">
      {initialPage === null ? <p>Instagram posts are temporarily unavailable. <a href="https://www.instagram.com/deakinrobotics/">Visit our Instagram</a>.</p> : !post ? <p>No Instagram posts available yet.</p> : <div className="reel-stack">
        {outgoing && <div className={`reel-outgoing reel-outgoing--${outgoing.direction === 1 ? "next" : "previous"}`} aria-hidden="true" inert><FeedFocusedContext.Provider value={false}><Post post={outgoing.post} profilePicture={profilePicture} /></FeedFocusedContext.Provider></div>}
        <div key={post.id} className={outgoing ? `reel-incoming reel-incoming--${outgoing.direction === 1 ? "next" : "previous"}` : undefined}><Post post={post} profilePicture={profilePicture} /></div>
      </div>}
      {failed && <div className="reel-status" role="status">Couldn’t load more posts. <button type="button" onClick={() => void loadMore()}>Try again</button></div>}
      {loading && index === posts.length - 1 && <p className="reel-status" role="status">Loading more posts…</p>}
      {!cursor && post && index === posts.length - 1 && index > 0 && <p className="reel-status" role="status">You’re all caught up.</p>}
    </section>
  </FeedFocus>;
}
