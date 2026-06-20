'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import { fetchTopPosts } from '@/store/slices/topPostsSlice';
import TopPostCard from '@/components/TopPostCard';

export default function TopPostsSection() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.topPosts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopPosts({ limit: 9, minScore: 9 }));
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={32} thickness={2} />
      </Box>
    );
  }

  if (status === 'failed' || !items.length) return null;

  return (
    <Box sx={{ mt: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={600} color="text.primary" gutterBottom>
          Top Picks
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Highest-scored content from the digest
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2.5,
        }}
      >
        {items.map((post) => (
          <TopPostCard key={post.uuid} post={post} />
        ))}
      </Box>
    </Box>
  );
}
