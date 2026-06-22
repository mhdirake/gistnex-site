'use client';

import { Suspense, useState } from 'react';
import { Box, Button, CircularProgress, Container, InputAdornment, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import BlogListClient from './_components/BlogListClient';
import NewsletterSection from './_components/NewsletterSection';

export default function BlogListPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmitted(query);
  };

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          pt: { xs: 8, md: 10 },
          pb: { xs: 7, md: 9 },
          textAlign: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{
              color: 'text.secondary',
              letterSpacing: '0.15em',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            Blog
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              color: 'text.primary',
              mt: 1.5,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Discover our latest news
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.75,
              maxWidth: 520,
              mx: 'auto',
              mb: 4,
            }}
          >
            Deep dives, insights, and practical takes — hand-picked for developers and
            tech enthusiasts who care about signal over noise.
          </Typography>

          {/* Search */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              maxWidth: 540,
              mx: 'auto',
            }}
          >
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              fullWidth
              size="medium"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 20, color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5,
                  bgcolor: 'background.default',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 3.5,
                borderRadius: 2.5,
                fontWeight: 600,
                flexShrink: 0,
                boxShadow: 'none',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': { boxShadow: 'none' },
              }}
            >
              Find Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Posts + Sidebar */}
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

      {/* Newsletter */}
      <NewsletterSection />
    </Box>
  );
}
