import { getBlogPosts } from '@/lib/api';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gistnex.com';

export default async function sitemap() {
  const staticRoutes = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    const { posts } = await getBlogPosts({ limit: 100 });
    const postRoutes = posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
