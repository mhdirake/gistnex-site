const BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';

const headers = { 'x-client-secret': CLIENT_SECRET };

export async function getBlogPosts({ page = 1, limit = 9 } = {}) {
  const res = await fetch(
    `${BASE_URL}/api/client/blog?page=${page}&limit=${limit}`,
    { headers, cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getTopPosts({ limit = 9, minScore = 9 } = {}) {
  const res = await fetch(
    `${BASE_URL}/api/client/top-posts?limit=${limit}&minScore=${minScore}`,
    { headers, cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch top posts');
  return res.json();
}

export async function getBlogPost(slug) {
  const res = await fetch(
    `${BASE_URL}/api/client/blog/${slug}`,
    { headers, cache: 'no-store' }
  );
  if (!res.ok) return null;
  return res.json();
}
