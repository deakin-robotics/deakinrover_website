import type { Metadata } from "next";
import Link from "next/link";

import { FeedFocus } from "@/components/media/feed-focus";
import { InstagramPost } from "@/components/media/instagram-post";
import { getInstagramPosts, getInstagramProfilePicture } from "@/lib/instagram";

export const metadata: Metadata = { title: "Media | Deakin Rover Team" };

export default async function MediaPage() {
  const [posts, profilePicture] = await Promise.all([getInstagramPosts(), getInstagramProfilePicture()]);
  return (
    <FeedFocus hasPost={Boolean(posts?.length)}>
      <div className="media-back page-section">
        <Link className="back-link" href="/">← Home</Link>
        <h1>Club <span>Feed</span></h1>
      </div>
      <section className="media-feed page-section" aria-label="Social media feed">
        {posts === null ? <p>Instagram posts are temporarily unavailable. <a href="https://www.instagram.com/deakinrobotics/">Visit our Instagram</a>.</p> : posts.slice(0, 1).map((post) => (
          <InstagramPost
            key={post.id}
            username="deakinrobotics"
            profilePicture={profilePicture}
            image={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
            video={post.media_type === "VIDEO" ? post.media_url : undefined}
            caption={post.caption ?? ""}
            date={post.timestamp.slice(0, 10)}
            postUrl={post.permalink}
          />
        ))}
      </section>
    </FeedFocus>
  );
}
