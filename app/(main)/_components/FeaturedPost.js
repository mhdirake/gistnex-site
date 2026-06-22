import { Box, Button, Chip, Container, Typography } from '@mui/material';
import { ArrowForwardOutlined, AccessTimeOutlined } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function FeaturedPost() {
  let post = null;
  try {
    const data = await getBlogPosts({ limit: 1 });
    post = data.posts?.[0] ?? null;
  } catch {}

  if (!post) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.72rem' }}>
            Featured
          </Typography>
          <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
        </Box>

        {/* Card */}
        <Box
          component={Link}
          href={`/blog/${post.slug}`}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 0,
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            textDecoration: 'none',
            bgcolor: 'background.paper',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: '0 8px 40px rgba(167,139,250,0.12)',
            },
            '&:hover .feat-img': { transform: 'scale(1.04)' },
          }}
        >
          {/* Image */}
          <Box sx={{ position: 'relative', minHeight: { xs: 240, md: 380 }, overflow: 'hidden', bgcolor: '#13131F' }}>
            {post.coverImage ? (
              <Box
                className="feat-img"
                sx={{ position: 'absolute', inset: 0, transition: 'transform 0.5s ease' }}
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority
                />
              </Box>
            ) : (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, #1A1A2E 0%, #2D1B69 100%)',
                }}
              />
            )}
          </Box>

          {/* Content */}
          <Box sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Tags */}
            {post.tags?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                {post.tags.slice(0, 2).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      bgcolor: 'rgba(167,139,250,0.1)',
                      color: 'primary.main',
                      border: '1px solid rgba(167,139,250,0.2)',
                    }}
                  />
                ))}
              </Box>
            )}

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                color: 'text.primary',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                mb: 2,
                fontSize: { xs: '1.5rem', md: '1.85rem' },
              }}
            >
              {post.title}
            </Typography>

            {post.summary && (
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.75,
                  mb: 3,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {post.summary}
              </Typography>
            )}

            {/* Meta */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
              {post.publishedAt && (
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
                  {formatDate(post.publishedAt)}
                </Typography>
              )}
              {post.readTime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
                  <AccessTimeOutlined sx={{ fontSize: 13 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                    {post.readTime} min read
                  </Typography>
                </Box>
              )}
            </Box>

            <Box>
              <Button
                variant="contained"
                endIcon={<ArrowForwardOutlined />}
                sx={{
                  px: 3,
                  py: 1.1,
                  borderRadius: 2,
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': { boxShadow: 'none' },
                }}
              >
                Read article
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
