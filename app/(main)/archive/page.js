import { Box, Chip, Container, Divider, Typography } from '@mui/material';
import { CalendarTodayOutlined, ArrowForwardOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/api';

export const metadata = {
  title: 'Archive',
  description: 'All GistNex articles organized by date.',
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function groupByMonth(posts) {
  const groups = {};
  for (const post of posts) {
    const d = new Date(post.publishedAt || Date.now());
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[key]) groups[key] = { label, posts: [] };
    groups[key].posts.push(post);
  }
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
}

export default async function ArchivePage() {
  let allPosts = [];
  try {
    const data = await getBlogPosts({ limit: 100 });
    allPosts = data.posts ?? [];
  } catch {}

  const grouped = groupByMonth(allPosts);

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <CalendarTodayOutlined sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.72rem' }}>
              Archive
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.03em', color: 'text.primary', mb: 1 }}>
            All articles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {allPosts.length} articles published
          </Typography>
        </Box>

        {/* Groups */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {grouped.map(([key, { label, posts }]) => (
            <Box key={key}>
              {/* Month header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: 'text.primary', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}
                >
                  {label}
                </Typography>
                <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                <Chip
                  label={`${posts.length} article${posts.length !== 1 ? 's' : ''}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    bgcolor: 'rgba(167,139,250,0.08)',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
              </Box>

              {/* Posts list */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {posts.map((post, i) => (
                  <Box key={post.uuid}>
                    <Box
                      component={Link}
                      href={`/blog/${post.slug}`}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 3,
                        py: 2.5,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        borderRadius: 1,
                        px: 0.5,
                        '&:hover .archive-content': { transform: 'translateX(6px)' },
                        '&:hover .archive-title': { color: 'primary.main' },
                        '&:hover .archive-arrow': { opacity: 1, transform: 'translateX(4px)' },
                      }}
                    >
                      <Box className="archive-content" sx={{ flex: 1, minWidth: 0, transition: 'transform 0.2s ease' }}>
                        <Typography
                          className="archive-title"
                          variant="subtitle1"
                          fontWeight={600}
                          sx={{
                            color: 'text.primary',
                            lineHeight: 1.4,
                            letterSpacing: '-0.01em',
                            transition: 'color 0.15s',
                            mb: 0.75,
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.78rem' }}>
                            {formatDate(post.publishedAt)}
                          </Typography>
                          {post.readTime && (
                            <>
                              <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.78rem' }}>
                                {post.readTime} min read
                              </Typography>
                            </>
                          )}
                          {post.tags?.slice(0, 2).map((tag) => (
                            <Box
                              key={tag}
                              component={Link}
                              href={`/blog/tag/${encodeURIComponent(tag)}`}
                              sx={{
                                fontSize: '0.65rem',
                                fontWeight: 500,
                                px: 0.75,
                                py: 0.25,
                                borderRadius: 0.5,
                                bgcolor: 'rgba(167,139,250,0.08)',
                                color: 'text.disabled',
                                border: '1px solid',
                                borderColor: 'divider',
                                textDecoration: 'none',
                              }}
                            >
                              {tag}
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      <ArrowForwardOutlined
                        className="archive-arrow"
                        sx={{
                          fontSize: 16,
                          color: 'primary.main',
                          opacity: 0,
                          transition: 'all 0.2s ease',
                          flexShrink: 0,
                          mt: 0.5,
                        }}
                      />
                    </Box>
                    {i < posts.length - 1 && <Divider sx={{ borderColor: 'divider', opacity: 0.5 }} />}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
