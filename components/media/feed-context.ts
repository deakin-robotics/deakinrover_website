"use client";

import { createContext, type RefObject } from "react";

export const FeedFocusedContext = createContext(false);
export const MediaPreloadContext = createContext(true);
export const CaptionCloseContext = createContext<RefObject<((onClosed: () => void) => void) | null> | null>(null);
