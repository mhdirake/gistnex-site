'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { fetchPosts } from '@/store/slices/postsSlice';
import BlogImageCard from '@/components/BlogImageCard';
import SidebarPostItem from '@/components/SidebarPostItem';
import PaginationNav from './PaginationNav';

function SidebarSection({ title, posts }) {
  if (!posts.length) return null;
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary" sx={{ whiteSpace: 'nowrap' }}>
          {title}
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>
      {posts.map((post) => (
        <SidebarPostItem key={post.uuid} post={post} />
      ))}
    </Box>
  );
}

export default function BlogListClient({ searchQuery }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get('page')) || 1);

  const { items, total, limit, status } = useSelector((state) => state.posts);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchPosts({ page, limit: 9 }));
  }, [dispatch, page]);

  const filtered = useMemo(() => {
    if (!searchQuery?.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.summary?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [items, searchQuery]);

  const featured = items.slice(0, 3);
  const latest = items.slice(0, 3);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress size={32} thickness={2} />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ py: 16, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="h6">Failed to load posts</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 320px' }, gap: 5 }}>
      {/* Main grid */}
      <Box>
        {filtered.length > 0 && (
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            sx={{ mb: 3, letterSpacing: '-0.02em' }}
          >
            {searchQuery ? `Results for "${searchQuery}"` : 'Latest articles'}
          </Typography>
        )}

        {filtered.length === 0 && status === 'succeeded' ? (
          <Box sx={{ py: 10, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="h6" gutterBottom>No posts found</Typography>
            <Typography variant="body2">Try a different search term.</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 2.5,
              }}
            >
              {filtered.map((post, i) => (
                <BlogImageCard key={post.uuid} post={post} featured={i === 0} />
              ))}
            </Box>

            {totalPages > 1 && !searchQuery && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <PaginationNav page={page} totalPages={totalPages} />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Sidebar */}
      <Box>
        <Box sx={{ position: 'sticky', top: 88 }}>
          <SidebarSection title="Featured" posts={featured} />
          <SidebarSection title="Latest" posts={latest} />
        </Box>
      </Box>
    </Box>
  );
}
