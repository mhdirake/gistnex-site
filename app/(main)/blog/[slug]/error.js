'use client';

import { Box, Typography, Button, Container } from '@mui/material';

export default function PostError({ reset }) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 2,
          py: 8,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ color: 'text.primary' }}>
          Post not available
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This post could not be loaded. It may have been removed or there was a network error.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="contained" onClick={reset} size="small">
            Retry
          </Button>
          <Button variant="outlined" href="/blog" size="small">
            All posts
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
