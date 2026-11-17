import Image from "next/image";
import { InstagramVideo } from "./instagram-video";
import { PostCaption } from "./post-caption";

type InstagramPostProps = {
  username: string;
  profilePicture?: string;
  image?: string;
  video?: string;
  caption: string;
  date: string;
  postUrl: string;
};

export function InstagramPost({ username, profilePicture, image, video, caption, date, postUrl }: InstagramPostProps) {
  const formattedDate = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));

  return (
    <article className="instagram-post">
      <header className="instagram-post-header">
        <a className="instagram-post-profile" href="https://www.instagram.com/deakinrobotics/" target="_blank" rel="noopener noreferrer">
          <span className="instagram-post-avatar" aria-hidden="true">{profilePicture ? <Image src={profilePicture} alt="" width={38} height={38} unoptimized /> : "DR"}</span>
          <span><strong>{username}</strong><small>Deakin Competitive Robotics</small></span>
        </a>
        <a className="instagram-post-open" href={postUrl} target="_blank" rel="noopener noreferrer" aria-label="Open post on Instagram">↗</a>
      </header>
      {(image || video) && <div className="instagram-post-media">
        {video ? <InstagramVideo src={video} poster={image} username={username} /> : image && <Image src={image} alt="Instagram post from Deakin Competitive Robotics" fill sizes="(max-width: 850px) 88vw, 700px" unoptimized />}
      </div>}
      <div className="instagram-post-content">
        <a className="instagram-post-view" href={postUrl} target="_blank" rel="noopener noreferrer">View on Instagram <span aria-hidden="true">↗</span></a>
        {caption && <PostCaption caption={caption} username={username} />}
        <time dateTime={date}>{formattedDate}</time>
      </div>
    </article>
  );
}
