'use client';

import { Suspense, useRef, useState } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { motion, useReducedMotion } from 'framer-motion';
import BlogListClient from './_components/BlogListClient';
import NewsletterSection from './_components/NewsletterSection';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const QUICK_TOPICS = ['TypeScript', 'Rust', 'React', 'Go', 'Systems', 'DevOps', 'Security', 'AI/ML'];

export default function BlogListPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [focused, setFocused] = useState(false);
  const prefersReduced = useReducedMotion();
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmitted(query.trim());
  };

  const handleTopicClick = (topic) => {
    setQuery(topic);
    setSubmitted(topic);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setQuery('');
    setSubmitted('');
  };

  return (
    <Box>
      {/* ── Hero ── */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 12, md: 16 },
          pb: { xs: 10, md: 13 },
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: 'radial-gradient(rgba(167,139,250,0.16) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        {/* Scan line */}
        {!prefersReduced && (
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
              animation: 'blogScan 8s linear infinite',
              '@keyframes blogScan': {
                '0%':   { transform: 'translateY(-2px)', opacity: 1 },
                '60%':  { transform: 'translateY(1000px)', opacity: 1 },
                '61%':  { transform: 'translateY(1000px)', opacity: 0 },
                '100%': { transform: 'translateY(-2px)', opacity: 0 },
              },
            }}
          />
        )}

        {/* Violet glow orb */}
        <MotionBox
          animate={prefersReduced ? {} : { scale: [1, 1.08, 1], opacity: [0.65, 0.95, 0.65] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            top: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 58%)',
            pointerEvents: 'none',
          }}
        />

        {/* Cyan glow orb — bottom right */}
        <MotionBox
          animate={prefersReduced ? {} : { scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          sx={{
            position: 'absolute',
            bottom: '-20%',
            right: '-5%',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 58%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ mb: 3 }}
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
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: 'rgba(167,139,250,0.7)',
                  flexShrink: 0,
                }}
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
                Developer Knowledge Base
              </Typography>
            </Box>
          </MotionBox>

          {/* Heading */}
          <MotionTypography
            component="h1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              fontSize: { xs: '2.4rem', sm: '3rem', md: '3.8rem' },
              fontWeight: 800,
              letterSpacing: '-0.045em',
              lineHeight: 1.08,
              color: 'text.primary',
              mb: 2.5,
            }}
          >
            Deep dives &{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(125deg, #A78BFA 0%, #22D3EE 50%, #A78BFA 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: prefersReduced ? undefined : 'blogGradShift 5s ease infinite',
                '@keyframes blogGradShift': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
              }}
            >
              technical insights
            </Box>
          </MotionTypography>

          {/* Subtitle */}
          <MotionTypography
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              fontSize: { xs: '0.98rem', md: '1.08rem' },
              color: 'text.secondary',
              lineHeight: 1.8,
              maxWidth: 480,
              mx: 'auto',
              mb: 5,
            }}
          >
            Hand-picked for developers who care about signal over noise.
          </MotionTypography>

          {/* Search field */}
          <MotionBox
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{ maxWidth: 560, mx: 'auto', position: 'relative' }}
            >
              <TextField
                inputRef={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search articles, topics, tools..."
                fullWidth
                size="medium"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined
                          sx={{
                            fontSize: 20,
                            color: focused ? 'primary.main' : 'text.disabled',
                            transition: 'color 0.2s',
                          }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {query ? (
                          <Box
                            component="button"
                            type="button"
                            onClick={handleClear}
                            sx={{
                              border: 'none',
                              bgcolor: 'transparent',
                              cursor: 'pointer',
                              color: 'text.disabled',
                              fontSize: '0.72rem',
                              fontFamily: 'monospace',
                              letterSpacing: '0.04em',
                              px: 0,
                              py: 0,
                              lineHeight: 1,
                              transition: 'color 0.15s',
                              '&:hover': { color: 'text.secondary' },
                            }}
                          >
                            ✕ clear
                          </Box>
                        ) : (
                          <Typography
                            sx={{
                              fontSize: '0.68rem',
                              color: 'rgba(255,255,255,0.18)',
                              fontFamily: 'monospace',
                              letterSpacing: '0.03em',
                              userSelect: 'none',
                            }}
                          >
                            ↵ search
                          </Typography>
                        )}
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '14px',
                    bgcolor: 'rgba(13,13,22,0.7)',
                    backdropFilter: 'blur(12px)',
                    fontSize: '0.95rem',
                    transition: 'box-shadow 0.25s ease',
                    '& fieldset': {
                      borderColor: focused
                        ? 'rgba(167,139,250,0.55)'
                        : 'rgba(167,139,250,0.15)',
                      transition: 'border-color 0.25s ease',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(167,139,250,0.35)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(167,139,250,0.6)',
                      borderWidth: '1px',
                    },
                    boxShadow: focused
                      ? '0 0 0 3px rgba(167,139,250,0.1), 0 8px 32px rgba(167,139,250,0.12)'
                      : '0 2px 12px rgba(0,0,0,0.3)',
                  },
                  '& .MuiOutlinedInput-input': {
                    py: 1.6,
                    '&::placeholder': { color: 'rgba(255,255,255,0.28)', opacity: 1 },
                  },
                }}
              />
            </Box>
          </MotionBox>

          {/* Quick topic chips */}
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            sx={{
              mt: 3,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            {QUICK_TOPICS.map((topic, i) => (
              <MotionBox
                key={topic}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.04 }}
              >
                <Chip
                  label={`#${topic}`}
                  size="small"
                  onClick={() => handleTopicClick(topic)}
                  sx={{
                    height: 26,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    bgcolor:
                      submitted === topic
                        ? 'rgba(167,139,250,0.18)'
                        : 'rgba(255,255,255,0.04)',
                    color: submitted === topic ? 'primary.main' : 'text.secondary',
                    border: '1px solid',
                    borderColor:
                      submitted === topic
                        ? 'rgba(167,139,250,0.4)'
                        : 'rgba(255,255,255,0.08)',
                    letterSpacing: '0.02em',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(167,139,250,0.12)',
                      borderColor: 'rgba(167,139,250,0.3)',
                      color: 'primary.main',
                    },
                  }}
                />
              </MotionBox>
            ))}
          </MotionBox>
        </Container>
      </Box>

      {/* ── Posts ── */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Suspense
            fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
                <CircularProgress size={32} thickness={2} />
              </Box>
            }
          >
            <BlogListClient searchQuery={submitted} />
          </Suspense>
        </Container>
      </Box>

      <NewsletterSection />
    </Box>
  );
}
