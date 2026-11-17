"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { FeedFocusedContext } from "./feed-context";

type FeedMode = "normal" | "focused" | "exiting";

function measureNormalHeight(page: HTMLElement, post: HTMLElement, feed: HTMLElement, heading: HTMLElement) {
  const feedTransition = feed.style.transition;
  const headingTransition = heading.style.transition;
  try {
    feed.style.transition = "none";
    heading.style.transition = "none";
    page.classList.remove("media-page--focused");
    return post.getBoundingClientRect().height;
  } finally {
    page.classList.add("media-page--focused");
    post.getBoundingClientRect();
    feed.style.transition = feedTransition;
    heading.style.transition = headingTransition;
  }
}

export function FeedFocus({ children, hasPost, postIndex, onMove }: { children: ReactNode; hasPost: boolean; postIndex: number; onMove: (direction: 1 | -1) => void }) {
  const [mode, setMode] = useState<FeedMode>("normal");
  const lastWheel = useRef(0);
  const pageRef = useRef<HTMLElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const focused = mode === "focused";
  const exiting = mode === "exiting";

  const enterFocus = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setMode("focused");
  }, []);

  const exitFocus = useCallback(() => {
    const page = pageRef.current;
    const post = page?.querySelector<HTMLElement>(".reel-stack > div:last-child .instagram-post");
    const feed = page?.querySelector<HTMLElement>(".media-feed");
    const heading = page?.querySelector<HTMLElement>(".media-back");
    if (!page || !post || !feed || !heading || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("normal");
      return;
    }

    const startHeight = post.getBoundingClientRect().height;
    const endHeight = measureNormalHeight(page, post, feed, heading);

    post.style.height = `${endHeight}px`;
    flushSync(() => setMode("exiting"));
    const animation = post.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], { duration: 500, easing: "ease" });
    animationRef.current = animation;
    const finish = () => {
      if (animationRef.current !== animation) return;
      animationRef.current = null;
      flushSync(() => setMode("normal"));
      post.style.removeProperty("height");
    };
    animation.onfinish = finish;
    animation.oncancel = finish;
  }, []);

  useEffect(() => {
    const finishOnResize = () => animationRef.current?.finish();
    window.addEventListener("resize", finishOnResize);
    return () => {
      window.removeEventListener("resize", finishOnResize);
      const animation = animationRef.current;
      animationRef.current = null;
      animation?.cancel();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || target?.closest("input, textarea, select, a, video, [contenteditable='true']")) return;
      if (target?.closest("button") && !target.closest(".post-caption-toggle, .caption-panel-header button")) return;
      if (event.key === "ArrowDown" && !focused && !exiting && hasPost) {
        event.preventDefault();
        enterFocus();
      } else if (event.key === "ArrowDown" && focused) {
        event.preventDefault();
        onMove(1);
      } else if (event.key === "ArrowUp" && focused && postIndex > 0) {
        event.preventDefault();
        onMove(-1);
      } else if ((event.key === "ArrowUp" || event.key === "Escape") && focused) {
        event.preventDefault();
        exitFocus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focused, hasPost, exiting, enterFocus, exitFocus, onMove, postIndex]);

  useEffect(() => {
    function onWheel(event: WheelEvent) {
      if (!hasPost || event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (exiting) { event.preventDefault(); return; }
      if (!focused && event.deltaY < 0) return;
      event.preventDefault();
      const now = performance.now();
      const isNewGesture = now - lastWheel.current > 180;
      lastWheel.current = now;
      if (!isNewGesture) return;
      if (event.deltaY > 0 && !focused) {
        enterFocus();
      } else if (event.deltaY > 0 && focused) {
        onMove(1);
      } else if (event.deltaY < 0 && focused && postIndex > 0) {
        onMove(-1);
      } else if (event.deltaY < 0 && focused) {
        exitFocus();
      }
    }
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [focused, hasPost, exiting, enterFocus, exitFocus, onMove, postIndex]);

  useEffect(() => {
    let start: { x: number; y: number } | null = null;
    function onTouchStart(event: TouchEvent) {
      const target = event.target as HTMLElement | null;
      if (event.touches.length !== 1 || target?.closest("button, a")) return;
      start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
    function onTouchEnd(event: TouchEvent) {
      if (!start || !hasPost || exiting) return;
      const x = event.changedTouches[0].clientX - start.x;
      const y = event.changedTouches[0].clientY - start.y;
      start = null;
      if (Math.abs(y) < 50 || Math.abs(y) <= Math.abs(x)) return;
      if (y < 0 && !focused) enterFocus();
      else if (y < 0 && focused) onMove(1);
      else if (y > 0 && focused && postIndex > 0) onMove(-1);
      else if (y > 0 && focused) exitFocus();
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => { window.removeEventListener("touchstart", onTouchStart); window.removeEventListener("touchend", onTouchEnd); };
  }, [focused, hasPost, exiting, enterFocus, exitFocus, onMove, postIndex]);

  return <FeedFocusedContext.Provider value={focused}><main ref={pageRef} className={`media-page${focused ? " media-page--focused" : ""}${exiting ? " media-page--exiting" : ""}`}>{children}</main></FeedFocusedContext.Provider>;
}
