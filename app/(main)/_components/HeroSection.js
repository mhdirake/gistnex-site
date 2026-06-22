'use client';

import { Box, Button, Chip, Container, Typography } from '@mui/material';
import { Telegram } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
};

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        borderBottom: '1px solid',
        borderColor: 'divider',
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Glow orbs — animated */}
      <MotionBox
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <MotionBox
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 350,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box sx={{ maxWidth: 680 }}>
          {/* Chip */}
          <MotionBox
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <Chip
              label="Tech Content Digest"
              size="small"
              sx={{
                mb: 3,
                bgcolor: 'primary.main',
                color: '#fff',
                fontWeight: 500,
                fontSize: '0.78rem',
                height: 26,
              }}
            />
          </MotionBox>

          {/* Heading */}
          <MotionTypography
            variant="h1"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            sx={{
              fontSize: { xs: '2.6rem', md: '3.8rem' },
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Stay sharp on
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              what matters
            </Box>
            {' '}in tech.
          </MotionTypography>

          {/* Subtitle */}
          <MotionTypography
            variant="body1"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: 'text.secondary',
              lineHeight: 1.75,
              mb: 4,
              maxWidth: 520,
            }}
          >
            GistNex delivers the most relevant developer news, tools, and insights —
            curated and published daily to Telegram.
          </MotionTypography>

          {/* Buttons */}
          <MotionBox
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
          >
            <Button
              variant="contained"
              size="large"
              component="a"
              href="https://t.me/gistnex"
              target="_blank"
              rel="noopener"
              startIcon={<Telegram />}
              sx={{
                px: 3.5,
                py: 1.3,
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: 2.5,
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' },
              }}
            >
              Join on Telegram
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/blog"
              sx={{
                px: 3.5,
                py: 1.3,
                fontWeight: 600,
                fontSize: '0.95rem',
                borderRadius: 2.5,
                borderColor: 'divider',
                color: 'text.primary',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'transparent' },
              }}
            >
              Read the blog
            </Button>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
