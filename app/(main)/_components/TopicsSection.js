import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';

const TAG_COLORS = [
  { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)', color: '#A78BFA' },
  { bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.25)', color: '#22D3EE' },
  { bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.25)', color: '#FB923C' },
  { bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)', color: '#34D399' },
  { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)', color: '#FBBF24' },
  { bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)', color: '#F87171' },
];

export default async function TopicsSection() {
  let tagMap = {};

  try {
    const data = await getBlogPosts({ limit: 100 });
    for (const post of data.posts) {
      for (const tag of post.tags ?? []) {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      }
    }
  } catch {}

  const topics = Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18);

  if (!topics.length) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ letterSpacing: '-0.025em' }}>
              Browse by topic
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Find articles on what you care about
            </Typography>
          </Box>
        </Box>

        {/* Tags grid */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {topics.map(([tag, count], i) => {
            const color = TAG_COLORS[i % TAG_COLORS.length];
            return (
              <Box
                key={tag}
                component={Link}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: color.border,
                  bgcolor: color.bg,
                  textDecoration: 'none',
                  transition: 'all 0.18s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 16px ${color.bg}`,
                    borderColor: color.color,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: color.color,
                  }}
                >
                  {tag}
                </Typography>
                <Box
                  sx={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: color.color,
                    bgcolor: `${color.bg}`,
                    opacity: 0.8,
                    minWidth: 20,
                    height: 20,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 0.75,
                  }}
                >
                  {count}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
