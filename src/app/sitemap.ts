import { allPosts, allEpisodes } from "contentlayer/generated";
import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const recentPost = allPosts.sort(
    (a, b) => new Date(b.date).getUTCDate() - new Date(a.date).getUTCDate(),
  )[0];

  return [
    {
      url: "https://quotes.maxwiseman.io/",
      lastModified: new Date("April 1 2024"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://quotes.maxwiseman.io/posts",
      lastModified: recentPost?.date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://quotes.maxwiseman.io/episodes",
      lastModified: new Date("April 1 2024"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...allPosts.map(
      (post): sitemapProperty => ({
        url: `https://quotes.maxwiseman.io${post.url}`,
        lastModified: post.date,
        changeFrequency: "weekly",
        priority: 0.5,
      }),
    ),
    ...allEpisodes.map(
      (episode): sitemapProperty => ({
        url: `https://quotes.maxwiseman.io${episode.url}`,
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    ),
  ];
}

interface sitemapProperty {
  url: string;
  lastModified?: string | Date | undefined;
  changeFrequency?:
    | "weekly"
    | "always"
    | "hourly"
    | "daily"
    | "monthly"
    | "yearly"
    | "never"
    | undefined;
  priority?: number | undefined;
}
