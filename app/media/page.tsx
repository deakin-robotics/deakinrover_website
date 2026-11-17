import type { Metadata } from "next";
import { ReelFeed } from "@/components/media/reel-feed";
import { getInstagramPosts, getInstagramProfilePicture } from "@/lib/instagram";

export const metadata: Metadata = { title: "Media | Deakin Rover Team" };

export default async function MediaPage() {
  const [page, profilePicture] = await Promise.all([getInstagramPosts(), getInstagramProfilePicture()]);
  return <ReelFeed initialPage={page} profilePicture={profilePicture} />;
}
