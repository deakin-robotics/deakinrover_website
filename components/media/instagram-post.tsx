import Image from "next/image";
import { PostCaption } from "./post-caption";

type InstagramPostProps = {
  username: string;
  image?: string;
  video?: string;
  caption: string;
  date: string;
  postUrl: string;
};

export function InstagramPost({ username, image, video, caption, date, postUrl }: InstagramPostProps) {
  const formattedDate = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

  return (
    <article className="instagram-post">
      <header className="instagram-post-header">
        <a className="instagram-post-profile" href="https://www.instagram.com/deakinrobotics/" target="_blank" rel="noopener noreferrer">
          <span className="instagram-post-avatar" aria-hidden="true">DR</span>
          <span><strong>{username}</strong><small>Deakin Competitive Robotics</small></span>
        </a>
        <a className="instagram-post-open" href={postUrl} target="_blank" rel="noopener noreferrer" aria-label="Open post on Instagram">↗</a>
      </header>
      {(image || video) && <div className="instagram-post-media">
        {video ? <video src={video} poster={image} controls playsInline preload="none" aria-label={`${username} video post`} /> : image && <Image src={image} alt="Instagram post from Deakin Competitive Robotics" fill sizes="(max-width: 850px) 88vw, 620px" unoptimized />}
      </div>}
      <div className="instagram-post-content">
        <a className="instagram-post-view" href={postUrl} target="_blank" rel="noopener noreferrer">View on Instagram <span aria-hidden="true">↗</span></a>
        {caption && <PostCaption caption={caption} username={username} />}
        <time dateTime={date}>{formattedDate}</time>
      </div>
    </article>
  );
}
