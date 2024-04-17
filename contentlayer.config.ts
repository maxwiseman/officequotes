import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

export const Misc = defineDocumentType(() => ({
  name: "Misc",
  filePathPattern: "misc/**/*.mdx",
  contentType: "mdx",
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    published: { type: "boolean", required: false, default: true },
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export const Episode = defineDocumentType(() => ({
  name: "Episode",
  filePathPattern: "episodes/**/*.mdx",
  contentType: "mdx",
  fields: {
    episode: { type: "number", required: true },
    season: { type: "number", required: true },
    title: { type: "string", required: true },
    writer: { type: "string", required: false },
    director: { type: "string", required: false },
    transcriber: { type: "string", required: false },
    date: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post, Misc, Episode],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
      [
        rehypePrettyCode as (options: Options) => undefined,
        {
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          keepBackground: false,
          defaultLang: "plaintext",
        },
      ],
    ],
  },
});
