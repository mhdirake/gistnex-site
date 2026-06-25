'use client';

import { useState } from 'react';
import { Box, Container, TextField, Typography, InputAdornment } from '@mui/material';
import { ArrowForwardRounded, CheckRounded, MailOutlineRounded } from '@mui/icons-material';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: '#060610',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        py: { xs: 10, md: 14 },
        overflow: 'hidden',
        // Dot grid
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(167,139,250,0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        },
        // Purple ambient glow left
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '40%',
          left: '-5%',
          width: '45%',
          height: '80%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 7, md: 8, lg: 12 },
            alignItems: 'center',
          }}
        >
          {/* Left: editorial copy */}
          <Box>
            {/* Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                bgcolor: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.22)',
                mb: 3.5,
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: '#A78BFA',
                  boxShadow: '0 0 6px rgba(167,139,250,0.8)',
                  '@keyframes dotBlink': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.25 },
                  },
                  animation: 'dotBlink 1.8s ease-in-out infinite',
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#A78BFA',
                  textTransform: 'uppercase',
                }}
              >
                Weekly Newsletter
              </Typography>
            </Box>

            {/* Headline */}
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2.6rem', sm: '3.4rem', md: '3.75rem', lg: '4.25rem' },
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: '-0.045em',
                color: '#F0EBF8',
                mb: 3,
              }}
            >
              Stay in
              <Box
                component="span"
                sx={{
                  display: 'block',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundImage: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 60%, #C4B5FD 100%)',
                }}
              >
                the loop.
              </Box>
            </Typography>

            {/* Body */}
            <Typography
              sx={{
                fontSize: { xs: '0.95rem', md: '1rem' },
                color: 'rgba(255,255,255,0.38)',
                lineHeight: 1.8,
                maxWidth: 360,
              }}
            >
              The best developer content, curated weekly.
              No noise, no spam — unsubscribe anytime.
            </Typography>

            {/* Decorative divider */}
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                maxWidth: 300,
              }}
            >
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(255,255,255,0.07)' }} />
              <Box sx={{ display: 'flex', gap: 0.75 }}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: i === 1 ? 'rgba(167,139,250,0.5)' : 'rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(255,255,255,0.07)' }} />
            </Box>
          </Box>

          {/* Right: form card */}
          <Box
            sx={{
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.07)',
              bgcolor: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(12px)',
              p: { xs: 3.5, sm: 4.5 },
              position: 'relative',
              overflow: 'hidden',
              // Top shimmer line
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)',
              },
              // Bottom glow
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '30%',
                right: '30%',
                height: '60px',
                background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              },
            }}
          >
            {submitted ? (
              <Box
                sx={{
                  py: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2.5,
                  textAlign: 'center',
                  '@keyframes successPop': {
                    '0%': { transform: 'scale(0.85)', opacity: 0 },
                    '60%': { transform: 'scale(1.04)' },
                    '100%': { transform: 'scale(1)', opacity: 1 },
                  },
                  animation: 'successPop 0.35s ease-out forwards',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '18px',
                    bgcolor: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 24px rgba(52,211,153,0.12)',
                  }}
                >
                  <CheckRounded sx={{ color: '#34D399', fontSize: 26 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#F0EBF8', mb: 0.75 }}>
                    You&apos;re in!
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
                    First issue lands in your inbox next week. Stay tuned.
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit}>
                <Typography
                  sx={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    mb: 1,
                  }}
                >
                  Your email
                </Typography>

                {/* Input wrapper */}
                <Box
                  sx={{
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: focused ? 'rgba(124,58,237,0.45)' : 'rgba(255,255,255,0.09)',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.1)' : 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    mb: 2,
                    overflow: 'hidden',
                  }}
                >
                  <TextField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="you@example.com"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineRounded
                            sx={{
                              fontSize: 17,
                              color: focused ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.2)',
                              transition: 'color 0.2s',
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'transparent',
                        fontSize: '0.9rem',
                        '& fieldset': { border: 'none' },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'rgba(255,255,255,0.82)',
                        py: 1.5,
                        '&::placeholder': { color: 'rgba(255,255,255,0.18)', opacity: 1 },
                      },
                    }}
                  />
                </Box>

                {/* Submit button */}
                <Box
                  component="button"
                  type="submit"
                  sx={{
                    width: '100%',
                    py: 1.625,
                    px: 3,
                    borderRadius: '12px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.025em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 24px rgba(124,58,237,0.32)',
                    fontFamily: 'inherit',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)',
                      boxShadow: '0 6px 32px rgba(124,58,237,0.48)',
                      transform: 'translateY(-1px)',
                    },
                    '&:active': { transform: 'translateY(0)', boxShadow: '0 2px 16px rgba(124,58,237,0.3)' },
                  }}
                >
                  Subscribe
                  <ArrowForwardRounded sx={{ fontSize: 18 }} />
                </Box>

                <Typography
                  sx={{
                    fontSize: '0.71rem',
                    color: 'rgba(255,255,255,0.18)',
                    textAlign: 'center',
                    mt: 2,
                    letterSpacing: '0.01em',
                  }}
                >
                  No spam. Unsubscribe at any time.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
