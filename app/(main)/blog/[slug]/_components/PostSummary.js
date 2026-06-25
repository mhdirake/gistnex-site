import { Box, Typography } from '@mui/material';
import { AutoAwesomeOutlined, CheckCircleOutlined } from '@mui/icons-material';

export default function PostSummary({ summary, highlights }) {
  if (!summary && (!highlights || highlights.length === 0)) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        my: 5,
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(167,139,250,0.2)',
        background: 'linear-gradient(135deg, rgba(167,139,250,0.06) 0%, rgba(34,211,238,0.04) 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: '100%',
          background: 'linear-gradient(180deg, #A78BFA 0%, #22D3EE 100%)',
          borderRadius: '3px 0 0 3px',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AutoAwesomeOutlined sx={{ fontSize: 15, color: 'primary.main', opacity: 0.8 }} />
        <Typography
          sx={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'primary.main',
            opacity: 0.9,
          }}
        >
          Quick Summary
        </Typography>
      </Box>

      {/* Summary paragraph */}
      {summary && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.75,
            fontSize: '0.95rem',
            mb: highlights?.length ? 2.5 : 0,
          }}
        >
          {summary}
        </Typography>
      )}

      {/* Bullet points */}
      {highlights?.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {highlights.map((point, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
              <CheckCircleOutlined
                sx={{
                  fontSize: 15,
                  color: 'primary.main',
                  opacity: 0.7,
                  mt: '3px',
                  flexShrink: 0,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.6,
                  fontSize: '0.9rem',
                  opacity: 0.88,
                }}
              >
                {point}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
