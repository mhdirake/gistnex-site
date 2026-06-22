import { Box, Chip, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogImageCard({ post, featured = false }) {
  const { title, slug, summary, coverImage, tags, publishedAt } = post;

  return (
    <Box
      component={Link}
      href={`/blog/${slug}`}
      sx={{
        position: 'relative',
        display: 'block',
        borderRadius: 3,
        overflow: 'hidden',
        textDecoration: 'none',
        height: 320,
        bgcolor: '#1E293B',
        cursor: 'pointer',
        '&:hover .card-img': { transform: 'scale(1.04)' },
        '&:hover .card-overlay': { opacity: 1 },
      }}
    >
      {/* Cover image */}
      {coverImage ? (
        <Box
          className="card-img"
          sx={{
            position: 'absolute',
            inset: 0,
            transition: 'transform 0.5s ease',
          }}
        >
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
          className="card-img"
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: '#334155',
            transition: 'transform 0.5s ease',
          }}
        />
      )}

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* Hover tint */}
      <Box
        className="card-overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(124,58,237,0.12)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Category chip */}
      {tags?.[0] && (
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
          <Chip
            label={tags[0]}
            size="small"
            sx={{
              height: 24,
              fontSize: '0.72rem',
              fontWeight: 500,
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          />
        </Box>
      )}

      {/* Content */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: { xs: 2, sm: 2.5 },
        }}
      >
        {publishedAt && (
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', mb: 1 }}>
            {formatDate(publishedAt)}
          </Typography>
        )}
        <Typography
          variant={featured ? 'h5' : 'h6'}
          sx={{
            color: '#fff',
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
            mb: summary ? 1 : 0,
          }}
        >
          {title}
        </Typography>
        {summary && (
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.55,
              fontSize: '0.83rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {summary}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
