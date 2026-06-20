import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function SidebarPostItem({ post }) {
  const { title, slug, coverImage, publishedAt } = post;

  return (
    <Box
      component={Link}
      href={`/blog/${slug}`}
      sx={{
        display: 'flex',
        gap: 1.5,
        textDecoration: 'none',
        alignItems: 'flex-start',
        py: 1.75,
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
        '&:hover .sidebar-title': { color: 'primary.main' },
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          width: 72,
          height: 56,
          borderRadius: 1.5,
          overflow: 'hidden',
          flexShrink: 0,
          bgcolor: '#F1F5F9',
          position: 'relative',
        }}
      >
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="72px"
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#CBD5E1' }}>
              GN
            </Typography>
          </Box>
        )}
      </Box>

      {/* Text */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {publishedAt && (
          <Typography sx={{ fontSize: '0.72rem', color: 'text.disabled', mb: 0.4 }}>
            {formatDate(publishedAt)}
          </Typography>
        )}
        <Typography
          className="sidebar-title"
          variant="body2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: 1.4,
            fontSize: '0.85rem',
            transition: 'color 0.15s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
