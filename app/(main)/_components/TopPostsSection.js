'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
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

  if (status === 'loading') return null;
  if (status === 'failed' || !items.length) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ letterSpacing: '-0.025em' }}>
            Top Picks
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Highest-scored content from the digest
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 2.5,
          }}
        >
          {items.map((post) => (
            <TopPostCard key={post.uuid} post={post} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
