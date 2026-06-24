'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 2,
          py: 8,
        }}
      >
        <Typography variant="h5" fontWeight={600} sx={{ color: 'text.primary' }}>
          Something went wrong
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
          An unexpected error occurred. You can try again or go back to the home page.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
          <Button variant="contained" onClick={reset} size="small">
            Try again
          </Button>
          <Button variant="outlined" href="/" size="small">
            Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
