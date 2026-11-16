import type { Metadata } from "next";
import Link from "next/link";

import { InstagramPost } from "@/components/media/instagram-post";
import { LinkedInPost } from "@/components/media/linkedin-post";
import { getInstagramPosts } from "@/lib/instagram";

export const metadata: Metadata = { title: "Media | Deakin Rover Team" };

export default async function MediaPage() {
  const posts = await getInstagramPosts();
  return (
    <main className="media-page">
      <div className="media-back page-section">
        <Link className="back-link" href="/">← Home</Link>
      </div>
      <section className="media-feed page-section" aria-label="Social media feed">
        {posts === null ? <p>Instagram posts are temporarily unavailable. <a href="https://www.instagram.com/deakinrobotics/">Visit our Instagram</a>.</p> : posts.map((post) => (
          <InstagramPost
            key={post.id}
            username="deakinrobotics"
            image={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
            video={post.media_type === "VIDEO" ? post.media_url : undefined}
            caption={post.caption ?? ""}
            date={post.timestamp.slice(0, 10)}
            postUrl={post.permalink}
          />
        ))}
        <LinkedInPost
          username="NASA - National Aeronautics and Space Administration"
          caption="NASA shares a Hubble image of a bright star and its companion in the Orion Nebula."
          postUrl="https://www.linkedin.com/posts/nasa_have-a-stellar-fourth-of-july-our-hubble-activity-7346980273567268865-CcVK"
          isSample
        />
      </section>
    </main>
  );
}
