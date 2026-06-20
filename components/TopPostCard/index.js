import { Box, Chip, Typography } from '@mui/material';
import { OpenInNewOutlined } from '@mui/icons-material';

const CATEGORY_LABELS = {
  news_intelligence: 'News',
  architecture_insights: 'Architecture',
  performance_signals: 'Performance',
  ecosystem_signals: 'Ecosystem',
};

export default function TopPostCard({ post }) {
  const { headline, tldr, category, relevanceScore, sourceUrl, publishedAt } = post;
  const categoryLabel = CATEGORY_LABELS[category] || category;

  return (
    <Box
      component="a"
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: 2.5,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        textDecoration: 'none',
        height: '100%',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
        },
      }}
    >
      {/* Top row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Chip
          label={categoryLabel}
          size="small"
          sx={{
            height: 22,
            fontSize: '0.7rem',
            fontWeight: 500,
            bgcolor: '#EFF6FF',
            color: 'primary.main',
            border: '1px solid #DBEAFE',
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'primary.main',
              bgcolor: '#EFF6FF',
              border: '1px solid #DBEAFE',
              borderRadius: 1,
              px: 0.75,
              py: 0.2,
              lineHeight: 1.6,
            }}
          >
            {Number(relevanceScore).toFixed(1)}
          </Typography>
        </Box>
      </Box>

      {/* Headline */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          lineHeight: 1.45,
          fontSize: '0.925rem',
          letterSpacing: '-0.01em',
        }}
      >
        {headline}
      </Typography>

      {/* TL;DR */}
      {tldr && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '0.83rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tldr}
        </Typography>
      )}

      {/* Footer */}
      <Box
        sx={{
          mt: 'auto',
          pt: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {publishedAt && (
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
            {new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Typography>
        )}
        <OpenInNewOutlined sx={{ fontSize: 14, color: 'text.disabled', ml: 'auto' }} />
      </Box>
    </Box>
  );
}
