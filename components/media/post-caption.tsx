"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CaptionCloseContext, FeedFocusedContext } from "./feed-context";

type PostCaptionProps = { caption: string; username?: string };

export function PostCaption({ caption, username }: PostCaptionProps) {
  const focused = useContext(FeedFocusedContext);
  return <CaptionContent key={focused ? "focused" : "normal"} caption={caption} username={username} focused={focused} />;
}

function CaptionContent({ caption, username, focused }: PostCaptionProps & { focused: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [panelTarget, setPanelTarget] = useState<HTMLElement | null>(null);
  const [closing, setClosing] = useState(false);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const closeHandlerRef = useContext(CaptionCloseContext);
  const afterClose = useRef<(() => void) | null>(null);
  const lines = caption.split("\n");
  const preview = Array.from(lines.slice(0, 3).join("\n")).slice(0, 220).join("").trimEnd();
  const truncated = preview.length < caption.trimEnd().length;

  function closePanel() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPanelTarget(null);
      afterClose.current?.();
      afterClose.current = null;
    } else {
      setClosing(true);
    }
  }

  useEffect(() => {
    if (!closeHandlerRef || !panelTarget || !focused) return;
    closeHandlerRef.current = (onClosed) => {
      afterClose.current = onClosed;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPanelTarget(null);
        afterClose.current = null;
        onClosed();
      } else {
        setClosing(true);
      }
    };
    return () => { closeHandlerRef.current = null; };
  }, [closeHandlerRef, focused, panelTarget]);

  return (
    <><p className="post-caption" ref={captionRef}>
      {username && <><strong>{username}</strong>{" "}</>}
      {expanded || !truncated ? caption : `${preview}…`}
      {truncated && <> <button type="button" className="post-caption-toggle" aria-expanded={expanded || panelTarget !== null} onClick={() => {
        if (focused) {
          if (panelTarget && !closing) closePanel();
          else if (!afterClose.current) {
            setClosing(false);
            setPanelTarget(captionRef.current?.closest<HTMLElement>(".media-feed") ?? null);
          }
        } else {
          setPanelTarget(null);
          setExpanded(!expanded);
        }
      }}>{expanded ? "Show less" : "Show more"}</button></>}
    </p>
    {panelTarget && createPortal(<aside className={`caption-panel${closing ? " caption-panel--closing" : ""}`} aria-label="Full post caption" onAnimationEnd={(event) => {
      if (closing && event.target === event.currentTarget && event.animationName === "caption-panel-close") {
        setPanelTarget(null);
        setClosing(false);
        const onClosed = afterClose.current;
        afterClose.current = null;
        onClosed?.();
      }
    }}>
      <div className="caption-panel-header"><strong>Caption</strong><button type="button" aria-label="Close caption" onClick={closePanel}>×</button></div>
      <p>{username && <><strong>{username}</strong>{" "}</>}{caption}</p>
    </aside>, panelTarget)}</>
  );
}
