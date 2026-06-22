import { getBlogPosts } from '@/lib/api';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://gistnex.com';

function escape(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET() {
  let posts = [];
  try {
    const data = await getBlogPosts({ limit: 50 });
    posts = data.posts ?? [];
  } catch {
    posts = [];
  }

  const items = posts
    .map((post) => {
      const url = `${BASE}/blog/${post.slug}`;
      const date = post.publishedAt ? new Date(post.publishedAt).toUTCString() : new Date().toUTCString();
      return `
    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${date}</pubDate>
      <description>${escape(post.summary || '')}</description>
      ${(post.tags || []).map((t) => `<category>${escape(t)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GistNex</title>
    <link>${BASE}</link>
    <description>Tech content digest — curated developer news, tools, and insights.</description>
    <language>en</language>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
