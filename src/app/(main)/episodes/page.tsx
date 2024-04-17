import { EpisodeList } from "@/components/episode-list";
import { BreadcrumbGroup } from "@/components/ui/breadcrumb";
import { allEpisodes } from "contentlayer/generated";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Episodes - Office Quotes",
  description: "All episodes",
};

export default function PostsPage() {
  return (
    <>
      <BreadcrumbGroup
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Episodes",
            href: "/episodes",
          },
        ]}
      />
      <h1 className="mt-4 scroll-m-20 text-4xl font-bold tracking-tight">
        Episodes
      </h1>
      <EpisodeList
        episodes={allEpisodes.map((episode) => ({
          ...episode,
          body: undefined,
        }))}
      />
    </>
  );
}
