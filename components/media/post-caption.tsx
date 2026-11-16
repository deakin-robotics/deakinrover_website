"use client";

import { useState } from "react";

type PostCaptionProps = { caption: string; username?: string };

export function PostCaption({ caption, username }: PostCaptionProps) {
  const [expanded, setExpanded] = useState(false);
  const lines = caption.split("\n");
  const preview = Array.from(lines.slice(0, 3).join("\n")).slice(0, 220).join("").trimEnd();
  const truncated = preview.length < caption.trimEnd().length;

  return (
    <p className="post-caption">
      {username && <><strong>{username}</strong>{" "}</>}
      {expanded || !truncated ? caption : `${preview}…`}
      {truncated && <> <button type="button" className="post-caption-toggle" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "Show more"}</button></>}
    </p>
  );
}
