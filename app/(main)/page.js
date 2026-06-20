import { Box, Button, Container, Typography, Chip } from '@mui/material';
import { Telegram, RssFeedOutlined, AutoStoriesOutlined } from '@mui/icons-material';
import Link from 'next/link';
import TopPostsSection from './_components/TopPostsSection';

export default function LandingPage() {
  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 680 }}>
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
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.6rem', md: '3.8rem' },
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                color: 'text.primary',
                mb: 3,
              }}
            >
              Stay sharp on
              <br />
              what matters in tech.
            </Typography>
            <Typography
              variant="body1"
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
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 8, md: 10 }, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {[
              {
                icon: <RssFeedOutlined sx={{ fontSize: 24 }} />,
                title: 'Curated Sources',
                body: 'Pulled from the best RSS feeds and tech publications — filtered for signal, not noise.',
              },
              {
                icon: <Telegram sx={{ fontSize: 24 }} />,
                title: 'Daily Telegram Digest',
                body: 'Delivered straight to your Telegram channel every day. No algorithm, no ads.',
              },
              {
                icon: <AutoStoriesOutlined sx={{ fontSize: 24 }} />,
                title: 'In-depth Blog',
                body: 'Long-form posts diving deeper into topics that deserve more than a headline.',
              },
            ].map(({ icon, title, body }) => (
              <Box key={title}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: 'primary.main',
                    borderRadius: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    '& svg': { color: '#fff' },
                  }}
                >
                  {icon}
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Top picks */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <TopPostsSection />
        </Container>
      </Box>
    </Box>
  );
}
