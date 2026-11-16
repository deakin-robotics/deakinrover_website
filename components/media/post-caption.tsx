"use client";

import { useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FeedFocusedContext } from "./feed-context";

type PostCaptionProps = { caption: string; username?: string };

export function PostCaption({ caption, username }: PostCaptionProps) {
  const focused = useContext(FeedFocusedContext);
  return <CaptionContent key={focused ? "focused" : "normal"} caption={caption} username={username} focused={focused} />;
}

function CaptionContent({ caption, username, focused }: PostCaptionProps & { focused: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [panelTarget, setPanelTarget] = useState<HTMLElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const lines = caption.split("\n");
  const preview = Array.from(lines.slice(0, 3).join("\n")).slice(0, 220).join("").trimEnd();
  const truncated = preview.length < caption.trimEnd().length;

  return (
    <><p className="post-caption" ref={captionRef}>
      {username && <><strong>{username}</strong>{" "}</>}
      {expanded || !truncated ? caption : `${preview}…`}
      {truncated && <> <button type="button" className="post-caption-toggle" aria-expanded={expanded || panelTarget !== null} onClick={() => {
        if (focused) {
          setPanelTarget(panelTarget ? null : captionRef.current?.closest<HTMLElement>(".media-feed") ?? null);
        } else {
          setPanelTarget(null);
          setExpanded(!expanded);
        }
      }}>{expanded ? "Show less" : "Show more"}</button></>}
    </p>
    {panelTarget && createPortal(<aside className="caption-panel" aria-label="Full post caption">
      <div className="caption-panel-header"><strong>Caption</strong><button type="button" aria-label="Close caption" onClick={() => setPanelTarget(null)}>×</button></div>
      <p>{username && <><strong>{username}</strong>{" "}</>}{caption}</p>
    </aside>, panelTarget)}</>
  );
}
