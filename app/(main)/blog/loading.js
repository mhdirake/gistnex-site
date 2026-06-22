import { Box, Container, Skeleton } from '@mui/material';

function CardSkeleton() {
  return (
    <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Skeleton variant="rectangular" height={320} sx={{ bgcolor: '#1A1A2E' }} />
    </Box>
  );
}

export default function BlogLoading() {
  return (
    <Box sx={{ pt: { xs: 10, md: 14 }, pb: 8 }}>
      {/* Hero skeleton */}
      <Box sx={{ borderBottom: '1px solid #1E1E35', pb: 6, mb: 6 }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: '#1A1A2E', mb: 2 }} />
          <Skeleton variant="text" width="55%" height={52} sx={{ bgcolor: '#1A1A2E', mb: 1 }} />
          <Skeleton variant="text" width="40%" height={52} sx={{ bgcolor: '#1A1A2E', mb: 3 }} />
          <Skeleton variant="rectangular" width={160} height={48} sx={{ bgcolor: '#1A1A2E', borderRadius: 2 }} />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 320px' }, gap: 5 }}>
          {/* Main grid */}
          <Box>
            <Skeleton variant="text" width={140} height={32} sx={{ bgcolor: '#1A1A2E', mb: 3 }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }, gap: 2.5 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </Box>
          </Box>

          {/* Sidebar */}
          <Box>
            <Skeleton variant="text" width={100} height={28} sx={{ bgcolor: '#1A1A2E', mb: 2 }} />
            {Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 1.5, py: 1.75, borderBottom: '1px solid #1E1E35' }}>
                <Skeleton variant="rectangular" width={72} height={56} sx={{ bgcolor: '#1A1A2E', borderRadius: 1.5, flexShrink: 0 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="50%" height={14} sx={{ bgcolor: '#1A1A2E', mb: 0.5 }} />
                  <Skeleton variant="text" width="90%" height={16} sx={{ bgcolor: '#1A1A2E' }} />
                  <Skeleton variant="text" width="70%" height={16} sx={{ bgcolor: '#1A1A2E' }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
