import { Box, Container, Typography } from '@mui/material';
import { RssFeedOutlined, Telegram, AutoStoriesOutlined } from '@mui/icons-material';
import HeroSection from './_components/HeroSection';
import StatsBar from './_components/StatsBar';
import FeaturedPost from './_components/FeaturedPost';
import LatestPostsSection from './_components/LatestPostsSection';
import TopicsSection from './_components/TopicsSection';
import TopPostsSection from './_components/TopPostsSection';
import NewsletterSection from './blog/_components/NewsletterSection';
import { getBlogPosts } from '@/lib/api';

export default async function LandingPage() {
  let recentPosts = [];
  try {
    const data = await getBlogPosts({ limit: 4 });
    recentPosts = data.posts ?? [];
  } catch {}

  return (
    <Box>
      <HeroSection recentPosts={recentPosts} />

      {/* Stats */}
      <StatsBar />

      {/* Features */}
      <Box sx={{
        py: { xs: 8, md: 10 },
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '4%',
          right: '4%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.2) 35%, rgba(34,211,238,0.13) 65%, transparent 100%)',
        },
      }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 5,
            }}
          >
            {[
              {
                icon: <RssFeedOutlined sx={{ fontSize: 22 }} />,
                title: 'Curated Sources',
                body: 'Pulled from the best RSS feeds and tech publications — filtered for signal, not noise.',
              },
              {
                icon: <Telegram sx={{ fontSize: 22 }} />,
                title: 'Daily Telegram Digest',
                body: 'Delivered straight to your Telegram channel every day. No algorithm, no ads.',
              },
              {
                icon: <AutoStoriesOutlined sx={{ fontSize: 22 }} />,
                title: 'In-depth Blog',
                body: 'Long-form posts diving deeper into topics that deserve more than a headline.',
              },
            ].map(({ icon, title, body }) => (
              <Box key={title} sx={{ display: 'flex', gap: 2.5 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(34,211,238,0.08) 100%)',
                    border: '1px solid rgba(167,139,250,0.18)',
                    borderRadius: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }}
                >
                  {icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom color="text.primary">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Featured post */}
      <FeaturedPost />

      {/* Latest posts */}
      <LatestPostsSection />

      {/* Topics */}
      <TopicsSection />

      {/* Top picks (AI pipeline) */}
      <TopPostsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </Box>
  );
}
