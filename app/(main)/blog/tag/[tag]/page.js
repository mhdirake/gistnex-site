import { notFound } from 'next/navigation';
import { Box, Chip, Container, Typography } from '@mui/material';
import { ArrowBackOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';
import BlogCard from '@/components/BlogCard';

export async function generateMetadata({ params }) {
  const { tag } = await params;
  return {
    title: `#${tag} — GistNex`,
    description: `Articles tagged with ${tag}`,
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  let posts = [];
  try {
    const data = await getBlogPosts({ tag: decoded, limit: 30 });
    posts = data.posts ?? [];
  } catch {
    posts = [];
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Back */}
        <Box
          component={Link}
          href="/blog"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            mb: 5,
            transition: 'color 0.15s',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <ArrowBackOutlined sx={{ fontSize: 16 }} />
          All articles
        </Box>

        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label={`#${decoded}`}
            sx={{
              mb: 2,
              height: 32,
              fontSize: '0.85rem',
              fontWeight: 700,
              bgcolor: 'rgba(167,139,250,0.12)',
              color: 'primary.main',
              border: '1px solid rgba(167,139,250,0.25)',
              letterSpacing: '0.01em',
            }}
          />
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ letterSpacing: '-0.03em', color: 'text.primary' }}
          >
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Grid */}
        {posts.length === 0 ? (
          <Typography color="text.secondary">No articles found for this tag.</Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
              gap: 3,
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.uuid} post={post} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
