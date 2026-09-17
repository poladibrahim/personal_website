import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { profile } from '../data/site';
import { getPosts } from '../lib/posts';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();

  return rss({
    title: `${profile.name} — Blog`,
    description: profile.summary,
    site: context.site ?? 'https://poladibrahimov.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
};
