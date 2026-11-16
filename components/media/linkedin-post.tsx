import { PostCaption } from "./post-caption";

type LinkedInPostProps = {
  username: string;
  caption: string;
  postUrl: string;
  isSample?: boolean;
};

export function LinkedInPost({ username, caption, postUrl, isSample = false }: LinkedInPostProps) {
  return (
    <article className="social-post">
      <header className="social-post-header">
        <span className="social-post-avatar" aria-hidden="true">{username.slice(0, 1).toUpperCase()}</span>
        <div><strong>{username}</strong><span>LinkedIn{isSample ? " · Sample post" : ""}</span></div>
      </header>
      <div className="social-post-copy">
        <PostCaption caption={caption} />
        <a href={postUrl} target="_blank" rel="noopener noreferrer">View on LinkedIn ↗</a>
      </div>
    </article>
  );
}
