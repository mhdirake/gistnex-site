'use client';

import { Box, Typography, Button, Container } from '@mui/material';

export default function BlogError({ reset }) {
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
          Failed to load posts
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Could not fetch the blog list. Please try again.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button variant="contained" onClick={reset} size="small">
            Retry
          </Button>
          <Button variant="outlined" href="/" size="small">
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
