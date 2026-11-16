import Image from "next/image";

type SocialPostProps = {
  username: string;
  image?: string;
  imageAlt?: string;
  caption: string;
  date?: string;
  postUrl: string;
  platform: "Instagram" | "LinkedIn";
  isSample?: boolean;
};

export function SocialPost({ username, image, imageAlt, caption, date, postUrl, platform, isSample = false }: SocialPostProps) {
  const formattedDate = date ? new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)) : null;

  return (
    <article className="social-post">
      <header className="social-post-header">
        <span className="social-post-avatar" aria-hidden="true">{username.slice(0, 1).toUpperCase()}</span>
        <div><strong>{username}</strong><span>{platform}{isSample ? " · Sample post" : ""}</span></div>
      </header>
      {image && <div className="social-post-image">
        <Image src={image} alt={imageAlt ?? ""} fill sizes="(max-width: 850px) 88vw, 620px" />
      </div>}
      <div className="social-post-copy">
        <p><strong>{username}</strong> {caption}</p>
        {date && <time dateTime={date}>{formattedDate}</time>}
        <a href={postUrl} target="_blank" rel="noopener noreferrer">View on {platform} ↗</a>
      </div>
    </article>
  );
}
