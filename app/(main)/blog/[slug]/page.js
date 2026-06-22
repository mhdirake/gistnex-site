import { notFound } from 'next/navigation';
import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import { AccessTimeOutlined, CalendarTodayOutlined, ArrowBackOutlined } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost, getBlogPosts } from '@/lib/api';
import BlogContent from './_components/BlogContent';
import BlogPostActions from './_components/BlogPostActions';
import ShareButtons from './_components/ShareButtons';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gistnex.com';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getBlogPost(slug);
  if (!data?.post) return {};
  return {
    title: data.post.title,
    description: data.post.summary || '',
    openGraph: {
      title: data.post.title,
      description: data.post.summary || '',
      images: data.post.coverImage ? [data.post.coverImage] : [],
    },
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function RelatedPosts({ currentSlug, tags }) {
  try {
    const { posts } = await getBlogPosts({ limit: 9 });
    const related = posts
      .filter((p) => p.slug !== currentSlug && p.tags?.some((t) => tags?.includes(t)))
      .slice(0, 3);
    if (!related.length) return null;

    return (
      <Box sx={{ mt: 8, pt: 6, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3, letterSpacing: '-0.02em' }}>
          Related articles
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {related.map((post) => (
            <Box
              key={post.uuid}
              component={Link}
              href={`/blog/${post.slug}`}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                textDecoration: 'none',
                p: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 12px rgba(124,58,237,0.07)',
                },
              }}
            >
              {post.coverImage && (
                <Box sx={{ position: 'relative', width: 80, height: 60, flexShrink: 0, borderRadius: 1.5, overflow: 'hidden' }}>
                  <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: 'cover' }} sizes="80px" />
                </Box>
              )}
              <Box>
                <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ lineHeight: 1.4, mb: 0.5 }}>
                  {post.title}
                </Typography>
                {post.publishedAt && (
                  <Typography variant="caption" color="text.disabled">
                    {formatDate(post.publishedAt)}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const data = await getBlogPost(slug);
  if (!data?.post) notFound();

  const { title, summary, content, coverImage, tags, readTime, publishedAt } = data.post;
  const postUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Reading progress bar */}
      <BlogPostActions />

      {/* Hero cover */}
      {coverImage && (
        <Box sx={{ position: 'relative', width: '100%', height: { xs: 260, md: 460 }, bgcolor: '#1E293B' }}>
          <Image src={coverImage} alt={title} fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 40%, rgba(11,11,20,0.97) 100%)',
            }}
          />
        </Box>
      )}

      <Container maxWidth="md">
        {/* Back link */}
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
            mt: coverImage ? 3 : 6,
            mb: 4,
            transition: 'color 0.15s',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <ArrowBackOutlined sx={{ fontSize: 16 }} />
          Back to blog
        </Box>

        {/* Article header */}
        <Box component="article">
          {/* Tags */}
          {tags?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  component={Link}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  clickable
                  sx={{
                    height: 24,
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    bgcolor: 'rgba(167,139,250,0.1)',
                    color: 'primary.main',
                    border: '1px solid rgba(167,139,250,0.2)',
                    letterSpacing: '0.01em',
                    '&:hover': { bgcolor: 'rgba(167,139,250,0.2)' },
                  }}
                />
              ))}
            </Box>
          )}

          {/* Title */}
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: 'text.primary',
              mb: 2.5,
            }}
          >
            {title}
          </Typography>

          {/* Summary / lead */}
          {summary && (
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.75,
                mb: 3,
                fontWeight: 400,
              }}
            >
              {summary}
            </Typography>
          )}

          {/* Meta row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              py: 2.5,
              mb: 5,
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'divider',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
              {publishedAt && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                  <CalendarTodayOutlined sx={{ fontSize: 14 }} />
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {formatDate(publishedAt)}
                  </Typography>
                </Box>
              )}
              {readTime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                  <AccessTimeOutlined sx={{ fontSize: 14 }} />
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {readTime} min read
                  </Typography>
                </Box>
              )}
            </Box>
            <ShareButtons title={title} url={postUrl} />
          </Box>

          {/* Content */}
          <BlogContent content={content} />

          {/* Tags footer */}
          {tags?.length > 0 && (
            <Box sx={{ mt: 6, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  component={Link}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  clickable
                  sx={{
                    height: 26,
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    bgcolor: 'transparent',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                    transition: 'all 0.15s',
                  }}
                />
              ))}
            </Box>
          )}

          {/* Related posts */}
          <RelatedPosts currentSlug={slug} tags={tags} />
        </Box>

        {/* Bottom spacer */}
        <Box sx={{ pb: 10 }} />
      </Container>
    </Box>
  );
}
