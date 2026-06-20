import { notFound } from 'next/navigation';
import { Box, Chip, Container, Typography } from '@mui/material';
import { AccessTime, CalendarTodayOutlined } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost } from '@/lib/api';
import BlogContent from './_components/BlogContent';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getBlogPost(slug);
  if (!data?.post) return {};
  return {
    title: data.post.title,
    description: data.post.summary || '',
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const data = await getBlogPost(slug);
  if (!data?.post) notFound();

  const { title, summary, content, coverImage, tags, readTime, publishedAt } = data.post;

  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        {/* Back */}
        <Box
          component={Link}
          href="/blog"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            mb: 4,
            '&:hover': { color: 'primary.main' },
          }}
        >
          ← Back to blog
        </Box>

        {/* Tags */}
        {tags?.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  bgcolor: '#EFF6FF',
                  color: 'primary.main',
                  border: '1px solid #DBEAFE',
                }}
              />
            ))}
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: 'text.primary',
            mb: 2,
          }}
        >
          {title}
        </Typography>

        {/* Summary */}
        {summary && (
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.7, mb: 3 }}
          >
            {summary}
          </Typography>
        )}

        {/* Meta */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'text.secondary',
            pb: 4,
            mb: 4,
            borderBottom: '1px solid',
            borderColor: 'divider',
            flexWrap: 'wrap',
          }}
        >
          {publishedAt && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CalendarTodayOutlined sx={{ fontSize: 15 }} />
              <Typography variant="caption" sx={{ fontSize: '0.85rem' }}>
                {formatDate(publishedAt)}
              </Typography>
            </Box>
          )}
          {readTime && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <AccessTime sx={{ fontSize: 15 }} />
              <Typography variant="caption" sx={{ fontSize: '0.85rem' }}>
                {readTime} min read
              </Typography>
            </Box>
          )}
        </Box>

        {/* Cover image */}
        {coverImage && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 220, md: 380 },
              mb: 5,
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Image
              src={coverImage}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        )}

        {/* Content */}
        <BlogContent content={content} />
      </Container>
    </Box>
  );
}
