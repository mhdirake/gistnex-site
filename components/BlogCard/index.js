import { Box, Chip, Typography } from '@mui/material';
import { AccessTime, VisibilityOutlined } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

export default function BlogCard({ post }) {
  const { title, slug, summary, coverImage, tags, readTime, publishedAt, viewCount } = post;

  return (
    <Box
      component={Link}
      href={`/blog/${slug}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        textDecoration: 'none',
        height: '100%',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 24px rgba(124,58,237,0.08)',
        },
      }}
    >
      {coverImage ? (
        <Box sx={{ position: 'relative', height: 192, flexShrink: 0 }}>
          <Image
            src={coverImage}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: 192,
            flexShrink: 0,
            bgcolor: '#1A1A2E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#CBD5E1',
              letterSpacing: '-0.03em',
            }}
          >
            GN
          </Typography>
        </Box>
      )}

      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flex: 1, gap: 1.5 }}>
        {tags?.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {tags.slice(0, 2).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                component={Link}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                onClick={(e) => e.stopPropagation()}
                clickable
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  bgcolor: 'rgba(167,139,250,0.1)',
                  color: 'primary.main',
                  border: '1px solid rgba(167,139,250,0.2)',
                  '&:hover': { bgcolor: 'rgba(167,139,250,0.2)' },
                }}
              />
            ))}
          </Box>
        )}

        <Typography
          variant="h6"
          sx={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </Typography>

        {summary && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {summary}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            mt: 'auto',
            pt: 1,
            color: 'text.secondary',
          }}
        >
          {publishedAt && (
            <Typography variant="caption" sx={{ fontSize: '0.78rem' }}>
              {formatDate(publishedAt)}
            </Typography>
          )}
          {readTime && (
            <>
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <AccessTime sx={{ fontSize: 13, color: 'text.disabled' }} />
                <Typography variant="caption" sx={{ fontSize: '0.78rem' }}>
                  {readTime} min
                </Typography>
              </Box>
            </>
          )}
          {viewCount > 0 && (
            <>
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <VisibilityOutlined sx={{ fontSize: 13, color: 'text.disabled' }} />
                <Typography variant="caption" sx={{ fontSize: '0.78rem' }}>
                  {formatCount(viewCount)}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
