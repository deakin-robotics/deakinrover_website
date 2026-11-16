import "server-only";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export async function getInstagramProfilePicture(): Promise<string | undefined> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return undefined;

  try {
    const response = await fetch("https://graph.facebook.com/v27.0/17841472163255475?fields=profile_picture_url", {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });
    if (!response.ok) return undefined;
    const profile: { profile_picture_url?: string } = await response.json();
    return profile.profile_picture_url;
  } catch {
    return undefined;
  }
}

export async function getInstagramPosts(): Promise<InstagramMedia[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const posts: InstagramMedia[] = [];
  let after: string | undefined;

  try {
    do {
      const url = new URL("https://graph.facebook.com/v27.0/17841472163255475/media");
      url.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
      url.searchParams.set("limit", "100");
      if (after) url.searchParams.set("after", after);
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 300 },
      });
      if (!response.ok) throw new Error("Instagram request failed");
      const result: { data: InstagramMedia[]; paging?: { next?: string; cursors?: { after?: string } } } = await response.json();
      posts.push(...result.data);
      after = result.paging?.next ? result.paging.cursors?.after : undefined;
    } while (after);
    return posts;
  } catch {
    console.error("Unable to load Instagram posts");
    return null;
  }
}
