'use client';

import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { CheckCircleOutlined } from '@mui/icons-material';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#0F172A',
        py: { xs: 8, md: 10 },
        mt: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.light',
              letterSpacing: '0.15em',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Newsletter
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              mt: 1,
              mb: 1.5,
            }}
          >
            Stay in the loop
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.55)', mb: 4, lineHeight: 1.7 }}
          >
            Get the best tech content delivered to your inbox.
            No spam, unsubscribe any time.
          </Typography>

          {submitted ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
              <CheckCircleOutlined sx={{ color: '#34D399', fontSize: 26 }} />
              <Typography sx={{ color: '#34D399', fontWeight: 600 }}>
                You&apos;re subscribed!
              </Typography>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                gap: 1.5,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                fullWidth
                size="medium"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.06)',
                    borderRadius: 2,
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: '#fff',
                    '&::placeholder': { color: 'rgba(255,255,255,0.35)', opacity: 1 },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxShadow: 'none',
                  '&:hover': { boxShadow: 'none' },
                }}
              >
                Subscribe
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
