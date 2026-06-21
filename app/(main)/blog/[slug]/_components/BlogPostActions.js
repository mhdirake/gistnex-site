'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function BlogPostActions() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        height: 3,
        bgcolor: 'divider',
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: `${progress}%`,
          bgcolor: 'primary.main',
          transition: 'width 0.1s linear',
        }}
      />
    </Box>
  );
}
