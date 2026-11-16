"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

export function FeedFocus({ children, hasPost }: { children: ReactNode; hasPost: boolean }) {
  const [focused, setFocused] = useState(false);
  const [exiting, setExiting] = useState(false);
  const lastWheel = useRef(0);
  const pageRef = useRef<HTMLElement>(null);

  const exitFocus = useCallback(() => {
    const post = pageRef.current?.querySelector<HTMLElement>(".instagram-post");
    const feed = pageRef.current?.querySelector<HTMLElement>(".media-feed");
    if (!post || !feed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFocused(false);
      return;
    }

    const startHeight = post.getBoundingClientRect().height;
    const padding = getComputedStyle(feed);
    const targetWidth = Math.min(window.innerWidth, 900) - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight);
    const copy = post.cloneNode(true) as HTMLElement;
    Object.assign(copy.style, { position: "fixed", visibility: "hidden", width: `${targetWidth}px`, top: "0", left: "0", height: "auto" });
    copy.querySelectorAll("video").forEach((video) => { video.removeAttribute("src"); video.load(); });
    document.body.appendChild(copy);
    const endHeight = copy.getBoundingClientRect().height;
    copy.remove();

    post.style.height = `${endHeight}px`;
    flushSync(() => { setExiting(true); setFocused(false); });
    const animation = post.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], { duration: 500, easing: "ease" });
    animation.onfinish = () => {
      flushSync(() => setExiting(false));
      post.style.removeProperty("height");
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || target?.closest("input, textarea, select, button, a, video, [contenteditable='true']")) return;
      if (event.key === "ArrowDown" && !focused && !exiting && hasPost) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "auto" });
        setFocused(true);
      } else if ((event.key === "ArrowUp" || event.key === "Escape") && focused) {
        event.preventDefault();
        exitFocus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focused, hasPost, exiting, exitFocus]);

  useEffect(() => {
    function onWheel(event: WheelEvent) {
      const target = event.target as HTMLElement | null;
      if (!hasPost || event.ctrlKey || target?.closest(".caption-panel") || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (exiting) { event.preventDefault(); return; }
      if (!focused && event.deltaY < 0) return;
      event.preventDefault();
      const now = performance.now();
      const isNewGesture = now - lastWheel.current > 180;
      lastWheel.current = now;
      if (!isNewGesture) return;
      if (event.deltaY > 0 && !focused) {
        window.scrollTo({ top: 0, behavior: "auto" });
        setFocused(true);
      } else if (event.deltaY < 0 && focused) {
        exitFocus();
      }
    }
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [focused, hasPost, exiting, exitFocus]);

  return <main ref={pageRef} className={`media-page${focused ? " media-page--focused" : ""}${exiting ? " media-page--exiting" : ""}`}>{children}</main>;
}
