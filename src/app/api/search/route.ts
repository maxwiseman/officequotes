import { allEpisodes } from "contentlayer/generated";
import Fuse from "fuse.js";

const fuse = new Fuse(
  allEpisodes.map((item) => ({
    ...item,
    content: item.body.raw
      .replaceAll("<Scene>", " ")
      .replaceAll("</Scene>", " ")
      .replaceAll("\n", " ")
      .replaceAll("\\", " ")
      .replaceAll("**", ""),
  })),
  {
    keys: ["title", "content"],
    ignoreLocation: true,
  },
);

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("q") === "" || searchParams.has("q") !== true) {
    return Response.json([]);
  }

  return Response.json(
    fuse.search(searchParams.get("q") ?? "").map((result) => ({
      ...result,
      item: { ...result.item, body: undefined, content: undefined },
    })),
  );
}
