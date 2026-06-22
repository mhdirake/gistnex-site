import { Box, Container, Skeleton } from '@mui/material';

export default function PostLoading() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero image skeleton */}
      <Skeleton variant="rectangular" width="100%" height={{ xs: 260, md: 460 }} sx={{ bgcolor: '#1A1A2E' }} />

      <Container maxWidth="md">
        <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: '#1A1A2E', mt: 3, mb: 4 }} />

        {/* Tags */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
          {[80, 70, 90].map((w, i) => (
            <Skeleton key={i} variant="rectangular" width={w} height={24} sx={{ bgcolor: '#1A1A2E', borderRadius: 1 }} />
          ))}
        </Box>

        {/* Title */}
        <Skeleton variant="text" width="90%" height={52} sx={{ bgcolor: '#1A1A2E' }} />
        <Skeleton variant="text" width="75%" height={52} sx={{ bgcolor: '#1A1A2E', mb: 2 }} />

        {/* Summary */}
        <Skeleton variant="text" width="100%" height={22} sx={{ bgcolor: '#1A1A2E' }} />
        <Skeleton variant="text" width="85%" height={22} sx={{ bgcolor: '#1A1A2E', mb: 3 }} />

        {/* Meta row */}
        <Box sx={{ display: 'flex', gap: 2, py: 2.5, borderTop: '1px solid #1E1E35', borderBottom: '1px solid #1E1E35', mb: 5 }}>
          <Skeleton variant="text" width={120} height={18} sx={{ bgcolor: '#1A1A2E' }} />
          <Skeleton variant="text" width={80} height={18} sx={{ bgcolor: '#1A1A2E' }} />
        </Box>

        {/* Content */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} variant="text" width={`${85 + Math.random() * 15}%`} height={20} sx={{ bgcolor: '#1A1A2E', mb: 1 }} />
        ))}
      </Container>
    </Box>
  );
}
