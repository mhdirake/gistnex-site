import { Box, Container, Divider, Typography } from '@mui/material';
import { getBlogPosts } from '@/lib/api';

export default async function StatsBar() {
  let total = 0;
  let topicCount = 0;

  try {
    const data = await getBlogPosts({ limit: 100 });
    total = data.total ?? 0;
    const tags = new Set(data.posts.flatMap((p) => p.tags ?? []));
    topicCount = tags.size;
  } catch {}

  const stats = [
    { value: `${total}+`, label: 'Articles published' },
    { value: `${topicCount}`, label: 'Topics covered' },
    { value: 'Daily', label: 'Content updates' },
    { value: 'Free', label: 'Always' },
  ];

  return (
    <Box
      sx={{
        py: 4,
        position: 'relative',
        bgcolor: 'background.paper',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '4%',
          right: '4%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.2) 35%, rgba(34,211,238,0.13) 65%, transparent 100%)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: 0,
          }}
        >
          {stats.map(({ value, label }, i) => (
            <Box
              key={label}
              sx={{
                textAlign: 'center',
                py: { xs: 2, md: 0 },
                px: 3,
                borderRight: {
                  xs: i % 2 === 0 ? '1px solid' : 'none',
                  md: i < stats.length - 1 ? '1px solid' : 'none',
                },
                borderImage: {
                  xs: 'linear-gradient(180deg, transparent 20%, rgba(167,139,250,0.2) 50%, transparent 80%) 1',
                  md: 'linear-gradient(180deg, transparent 15%, rgba(167,139,250,0.2) 50%, transparent 85%) 1',
                },
                borderBottom: { xs: i < 2 ? '1px solid' : 'none', md: 'none' },
                borderBottomColor: 'rgba(167,139,250,0.1)',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(135deg, #A78BFA, #22D3EE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                  mb: 0.5,
                }}
              >
                {value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
