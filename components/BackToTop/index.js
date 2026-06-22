'use client';

import { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowUpOutlined } from '@mui/icons-material';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 1200,
      }}
    >
      <IconButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        size="small"
        sx={{
          width: 40,
          height: 40,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          color: 'text.secondary',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: 'primary.main',
            borderColor: 'primary.main',
            color: '#fff',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <KeyboardArrowUpOutlined sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  );
}
