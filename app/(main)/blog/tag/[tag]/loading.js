import { Box, Container, Skeleton } from '@mui/material';

export default function TagLoading() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: '#1A1A2E', mb: 5 }} />
        <Skeleton variant="rectangular" width={100} height={32} sx={{ bgcolor: '#1A1A2E', borderRadius: 1, mb: 2 }} />
        <Skeleton variant="text" width={120} height={36} sx={{ bgcolor: '#1A1A2E', mb: 6 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }, gap: 3 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Skeleton variant="rectangular" height={320} sx={{ bgcolor: '#1A1A2E' }} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
