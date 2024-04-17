import { allEpisodes } from "contentlayer/generated";
import Link from "next/link";
import { Card } from "./ui/card";

export function EpisodeList() {
  return (
    <div className="mt-6 flex flex-col gap-2">
      {allEpisodes.map((episode) => (
        <Link key={episode._id} href={episode.url}>
          <Card className="p-4">
            <h6 className="line-clamp-1 font-bold">{episode.title}</h6>
            <p className="line-clamp-1 text-muted-foreground">
              {episode.writer ?? episode.director}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
