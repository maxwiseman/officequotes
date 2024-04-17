"use server";

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

export async function searchEpisodes(query: string) {
  return fuse.search(query).map((result) => ({
    ...result,
    item: { ...result.item, body: undefined },
  }));
}
