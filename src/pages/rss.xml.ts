import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../config/site.config";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: `${siteConfig.name} Blog`,
    description: `Straight-talking guidance on Google reviews, local ranking, and reputation — from the team behind ${siteConfig.name}.`,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      author: post.data.author,
      categories: post.data.tags,
      link: `/blog/${post.data.slug}/`,
    })),
  });
}
