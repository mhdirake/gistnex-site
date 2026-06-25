'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { Telegram } from '@mui/icons-material';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const TAG_PALETTE = ['#60A5FA', '#FB923C', '#22D3EE', '#A78BFA', '#34D399', '#FBBF24', '#F87171'];

function tagColor(tag = '') {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h + tag.charCodeAt(i)) % TAG_PALETTE.length;
  return TAG_PALETTE[h];
}

function relativeTime(iso) {
  if (!iso) return '';
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function ScanLine() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background:
          'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.4) 25%, rgba(34,211,238,0.4) 75%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'heroScan 8s linear infinite',
        '@keyframes heroScan': {
          '0%':   { transform: 'translateY(-2px)', opacity: 1 },
          '60%':  { transform: 'translateY(1200px)', opacity: 1 },
          '61%':  { transform: 'translateY(1200px)', opacity: 0 },
          '100%': { transform: 'translateY(-2px)', opacity: 0 },
        },
      }}
    />
  );
}

function SignalFeed({ prefersReduced, posts }) {
  if (!posts?.length) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, x: 32, y: -8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: -1,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(167,139,250,0.3) 0%, rgba(34,211,238,0.15) 100%)',
          filter: 'blur(12px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          borderRadius: '14px',
          border: '1px solid rgba(167,139,250,0.18)',
          bgcolor: 'rgba(13,13,22,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.7), rgba(34,211,238,0.5), transparent)',
          }}
        />

        {/* Terminal header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'rgba(167,139,250,0.03)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 0.6 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
              <Box
                key={c}
                sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: c, opacity: 0.65 }}
              />
            ))}
          </Box>
          <Typography
            sx={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: '"Courier New", monospace',
              ml: 'auto',
              letterSpacing: '0.04em',
            }}
          >
            signal_feed.live
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1.5 }}>
            <MotionBox
              animate={prefersReduced ? {} : { opacity: [1, 0.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#22D3EE' }}
            />
            <Typography
              sx={{
                fontSize: '0.62rem',
                color: '#22D3EE',
                fontFamily: '"Courier New", monospace',
                letterSpacing: '0.06em',
                fontWeight: 700,
              }}
            >
              LIVE
            </Typography>
          </Box>
        </Box>

        {/* Signal rows */}
        {posts.map((post, i) => {
          const tag = post.tags?.[0] ?? 'Tech';
          const color = tagColor(tag);
          return (
            <MotionBox
              key={post.uuid ?? i}
              component="a"
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.8 + i * 0.12 }}
              sx={{
                px: 2,
                py: 1.6,
                borderBottom: i < posts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
              }}
            >
              <Box
                sx={{
                  mt: '5px',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: color,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${color}90`,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.4 }}>
                  <Typography
                    sx={{
                      fontSize: '0.67rem',
                      fontWeight: 700,
                      color,
                      fontFamily: '"Courier New", monospace',
                      letterSpacing: '0.02em',
                    }}
                  >
                    #{tag}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.6rem',
                      color: 'rgba(255,255,255,0.22)',
                      ml: 'auto',
                      flexShrink: 0,
                    }}
                  >
                    {relativeTime(post.publishedAt)}
                  </Typography>
                </Box>
                <Typography
                  sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}
                  noWrap
                >
                  {post.title}
                </Typography>
              </Box>
            </MotionBox>
          );
        })}

        {/* Footer */}
        <Box
          component="a"
          href="/blog"
          sx={{
            px: 2,
            py: 1.25,
            bgcolor: 'rgba(167,139,250,0.025)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            display: 'block',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
            '&:hover': { bgcolor: 'rgba(167,139,250,0.05)' },
          }}
        >
          <Typography
            sx={{
              fontSize: '0.67rem',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: '"Courier New", monospace',
              transition: 'color 0.2s',
              'a:hover &': { color: 'rgba(167,139,250,0.7)' },
            }}
          >
            → view all articles
          </Typography>
        </Box>
      </Box>
    </MotionBox>
  );
}

export default function HeroSection({ recentPosts = [] }) {
  const prefersReduced = useReducedMotion();

  return (
    <Box
      sx={{
        position: 'relative',
        pt: { xs: 12, md: 18 },
        pb: { xs: 12, md: 16 },
        overflow: 'hidden',
      }}
    >
      {/* Dot grid with radial fade */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(167,139,250,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 70% 80% at 40% 40%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 80% at 40% 40%, black 30%, transparent 100%)',
        }}
      />

      {/* Scan line sweep */}
      {!prefersReduced && <ScanLine />}

      {/* Violet glow orb — top left */}
      <MotionBox
        animate={prefersReduced ? {} : { scale: [1, 1.09, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: '-25%',
          left: '-8%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 58%)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyan glow orb — mid right */}
      <MotionBox
        animate={prefersReduced ? {} : { scale: [1, 1.13, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        sx={{
          position: 'absolute',
          top: '15%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 58%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom fade */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, rgba(11,11,20,0.7))',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 360px' },
            gap: { xs: 7, lg: 10 },
            alignItems: 'center',
          }}
        >
          {/* ── Left: Copy ── */}
          <Box>
            {/* Live badge */}
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{ mb: 3.5 }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.75,
                  py: 0.65,
                  border: '1px solid rgba(167,139,250,0.22)',
                  borderRadius: 10,
                  bgcolor: 'rgba(167,139,250,0.06)',
                }}
              >
                <MotionBox
                  animate={prefersReduced ? {} : { opacity: [1, 0.15, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#22D3EE', flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'rgba(167,139,250,0.85)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Tech Content Digest
                </Typography>
              </Box>
            </MotionBox>

            {/* Heading */}
            <MotionTypography
              component="h1"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.6rem', md: '4.4rem' },
                fontWeight: 800,
                letterSpacing: '-0.045em',
                lineHeight: 1.06,
                color: 'text.primary',
                mb: 3,
              }}
            >
              Stay sharp on
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background: 'linear-gradient(125deg, #A78BFA 0%, #22D3EE 50%, #A78BFA 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: prefersReduced
                    ? undefined
                    : 'heroGradShift 5s ease infinite',
                  '@keyframes heroGradShift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                }}
              >
                what matters
              </Box>
              in tech.
            </MotionTypography>

            {/* Subtitle */}
            <MotionTypography
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'text.secondary',
                lineHeight: 1.8,
                mb: 5,
                maxWidth: 460,
              }}
            >
              GistNex delivers the most relevant developer news, tools, and insights
              — curated and published daily to Telegram.
            </MotionTypography>

            {/* CTAs */}
            <MotionBox
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', alignItems: 'center' }}
            >
              {/* Telegram button with pulse ring */}
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {!prefersReduced && (
                  <MotionBox
                    animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    sx={{
                      position: 'absolute',
                      inset: -5,
                      borderRadius: '16px',
                      border: '1px solid rgba(167,139,250,0.45)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
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
                    py: 1.35,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
                    boxShadow: '0 0 28px rgba(167,139,250,0.38)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #B89DFB 0%, #8B47EE 100%)',
                      boxShadow: '0 0 40px rgba(167,139,250,0.55)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Join on Telegram
                </Button>
              </Box>

              {/* Blog link — minimal text style */}
              <Button
                variant="text"
                size="large"
                component={Link}
                href="/blog"
                sx={{
                  px: 1.5,
                  py: 1.35,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'text.secondary',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                  '&:hover': { color: 'text.primary', bgcolor: 'transparent' },
                  transition: 'color 0.2s',
                  '&::after': {
                    content: '"→"',
                    ml: 0.75,
                    display: 'inline-block',
                    transition: 'transform 0.2s',
                  },
                  '&:hover::after': { transform: 'translateX(3px)' },
                }}
              >
                Read the blog
              </Button>
            </MotionBox>
          </Box>

          {/* ── Right: Signal Feed (desktop only) ── */}
          <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'relative' }}>
            <SignalFeed prefersReduced={prefersReduced} posts={recentPosts} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
