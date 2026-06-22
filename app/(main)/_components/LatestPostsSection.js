import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';
import BlogImageCard from '@/components/BlogImageCard';

export default async function LatestPostsSection() {
  let posts = [];
  try {
    const data = await getBlogPosts({ limit: 6 });
    posts = data.posts ?? [];
  } catch {
    return null;
  }

  if (!posts.length) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              sx={{ letterSpacing: '-0.025em' }}
            >
              Latest articles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Fresh from the blog
            </Typography>
          </Box>
          <Box
            component={Link}
            href="/blog"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            View all →
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
            gap: 2.5,
          }}
        >
          {posts.map((post, i) => (
            <BlogImageCard key={post.uuid} post={post} featured={i === 0} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
