import type { Metadata } from "next";
import Link from "next/link";

import { SocialPost } from "@/components/media/social-post";

export const metadata: Metadata = { title: "Media | Deakin Rover Team" };

export default function MediaPage() {
  return (
    <main className="media-page">
      <div className="media-back page-section">
        <Link className="back-link" href="/">← Home</Link>
      </div>
      <section className="media-feed page-section" aria-label="Sample social media feed">
        <SocialPost
          username="nasa"
          image="/assets/media/nasa-sample.jpg"
          imageAlt="A composite image of a starburst galaxy"
          caption="Galaxy in bloom. Data from our Hubble, Chandra, and Spitzer telescopes blend to reveal a starburst galaxy."
          date="2026-11-06"
          postUrl="https://www.instagram.com/p/DfahZrMjAqq/"
          platform="Instagram"
          isSample
        />
        <SocialPost
          username="NASA - National Aeronautics and Space Administration"
          caption="NASA shares a Hubble image of a bright star and its companion in the Orion Nebula."
          postUrl="https://www.linkedin.com/posts/nasa_have-a-stellar-fourth-of-july-our-hubble-activity-7346980273567268865-CcVK"
          platform="LinkedIn"
          isSample
        />
      </section>
    </main>
  );
}
