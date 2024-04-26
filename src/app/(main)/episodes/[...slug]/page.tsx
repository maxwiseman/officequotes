// app/posts/[slug]/page.tsx
import { Mdx } from "@/components/mdx";
import { allEpisodes } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { BreadcrumbGroup } from "@/components/ui/breadcrumb";
import { Suspense } from "react";

export async function generateStaticParams() {
  return allEpisodes.map((project) => ({
    slug: project._raw.flattenedPath.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const episode = allEpisodes.find(
    (episode) =>
      episode._raw.flattenedPath.replace("episodes/", "") ===
      params.slug.join("/"),
    // episode.url === `/${params.slug.join("/")}`,
  );
  return {
    title: `${episode?.title} - Office Quotes`,
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string[] };
}): Promise<React.ReactElement> {
  // Find the post for the current page.
  const episode = allEpisodes.find(
    (episode) =>
      episode._raw.flattenedPath.replace("episodes/", "") ===
      params.slug.join("/"),
  );

  // 404 if the episode does not exist.
  if (!episode) notFound();

  return (
    <div>
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
          {
            title: episode.title,
          },
        ]}
      />
      <div className="mb-10">
        <h1 className="mt-4 scroll-m-20 text-4xl font-bold tracking-tight">
          <span className="shrink-0">{episode.title}</span>
        </h1>
        {episode.writer && (
          <h3 className="my-2 scroll-m-20 text-lg tracking-tight text-muted-foreground">
            <span className="font-bold text-primary">Writers: </span>{" "}
            {episode.writer}
          </h3>
        )}
        {episode.director && (
          <h3 className="my-2 scroll-m-20 text-lg tracking-tight text-muted-foreground">
            <span className="font-bold text-primary">Directors: </span>{" "}
            {episode.director}
          </h3>
        )}
        {episode.transcriber && (
          <h3 className="my-2 scroll-m-20 text-lg tracking-tight text-muted-foreground">
            <span className="font-bold text-primary">Transcribers: </span>{" "}
            {episode.transcriber}
          </h3>
        )}
        {episode.date && (
          <h3 className="my-2 scroll-m-20 text-lg tracking-tight text-muted-foreground">
            <span className="font-bold text-primary">Aired: </span>
            {new Date(episode.date ?? "").toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        )}
      </div>
      <Suspense>
        <Mdx code={episode.body.code} />
      </Suspense>
    </div>
  );
}
