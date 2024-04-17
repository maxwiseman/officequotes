import { BreadcrumbGroup } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { allEpisodes } from "contentlayer/generated";
import { type Metadata } from "next";
import Link from "next/link";

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
      <div className="mt-6 flex flex-col gap-2">
        {allEpisodes.map((episode) => (
          <Link key={episode._id} href={episode.url}>
            <Card className="p-4">
              <h6 className="font-bold">{episode.title}</h6>
              <p className="text-muted-foreground">
                {episode.writer ?? episode.director}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
