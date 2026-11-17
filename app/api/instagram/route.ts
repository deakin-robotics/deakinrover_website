import { getInstagramPosts } from "@/lib/instagram";

export async function GET(request: Request) {
  const cursor = new URL(request.url).searchParams.get("after");
  if (!cursor || cursor.length > 2048) return Response.json({ error: "Invalid cursor" }, { status: 400 });
  const page = await getInstagramPosts(cursor);
  if (!page) return Response.json({ error: "Instagram posts are temporarily unavailable" }, { status: 502 });
  return Response.json(page);
}
