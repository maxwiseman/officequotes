"use client";

import { type Episode } from "contentlayer/generated";
import Link from "next/link";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Spinner } from "./ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { type FuseResult } from "fuse.js";

export function EpisodeList({
  episodes,
}: {
  episodes: Omit<Episode, "body">[];
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useDebounceValue("", 1000);
  const { data, isLoading } = useQuery({
    queryKey: [searchQuery, "searchResults"],
    queryFn: (): Promise<FuseResult<Episode>[]> =>
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`).then(
        (res) => res.json() as Promise<FuseResult<Episode>[]>,
      ),
  });

  return (
    <>
      <Input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setSearchQuery(e.target.value);
        }}
        placeholder="Search..."
        className="mt-4"
      />
      <div className="mt-6 flex flex-col gap-2">
        {isLoading && searchQuery !== "" ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Spinner />
            Loading...
          </div>
        ) : searchQuery !== "" ? (
          data?.map((episode) => (
            <Link key={episode.item._id} href={episode.item.url ?? ""}>
              <Card className="p-4">
                <h6 className="line-clamp-1 font-bold">{episode.item.title}</h6>
                <p className="line-clamp-1 text-muted-foreground">
                  {episode.item.writer ?? episode.item.director}
                </p>
              </Card>
            </Link>
          ))
        ) : (
          episodes.map((episode) => (
            <Link key={episode._id} href={episode.url ?? ""}>
              <Card className="p-4">
                <h6 className="line-clamp-1 font-bold">{episode.title}</h6>
                <p className="line-clamp-1 text-muted-foreground">
                  {episode.writer ?? episode.director}
                </p>
              </Card>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
