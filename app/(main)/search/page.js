'use client';

import { useMemo, useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Container, InputAdornment, TextField, Typography, Chip } from '@mui/material';
import { SearchOutlined, CloseOutlined } from '@mui/icons-material';
import BlogCard from '@/components/BlogCard';
import axios from '@/lib/axiosClient';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/client/blog', { params: { limit: 100 } })
      .then((r) => setPosts(r.data.posts ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  // sync URL
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      router.replace(`/search${query ? `?${params}` : ''}`, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [query, router]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.summary?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, query]);

  // top tags for quick search
  const tagMap = useMemo(() => {
    const m = {};
    for (const p of posts) for (const t of p.tags ?? []) m[t] = (m[t] || 0) + 1;
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [posts]);

  return (
    <Box sx={{ minHeight: '80vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        {/* Heading */}
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ letterSpacing: '-0.03em', color: 'text.primary', mb: 1 }}
        >
          Search
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
          Search across {posts.length} articles
        </Typography>

        {/* Input */}
        <TextField
          fullWidth
          autoFocus
          placeholder="Search articles, topics, tags…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined sx={{ color: 'text.disabled', fontSize: 22 }} />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <CloseOutlined
                  onClick={() => setQuery('')}
                  sx={{ color: 'text.disabled', fontSize: 18, cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
                />
              </InputAdornment>
            ) : null,
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              fontSize: '1.05rem',
              bgcolor: 'background.paper',
              borderRadius: 2.5,
              '& fieldset': { borderColor: 'divider' },
              '&:hover fieldset': { borderColor: 'primary.main' },
              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
            },
            '& .MuiOutlinedInput-input': { color: 'text.primary', py: 1.75 },
          }}
        />

        {/* Quick tags */}
        {!query && tagMap.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, letterSpacing: '0.08em', fontSize: '0.7rem', display: 'block', mb: 1.5 }}>
              POPULAR TOPICS
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tagMap.map(([tag]) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  onClick={() => setQuery(tag)}
                  sx={{
                    height: 28,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    bgcolor: 'rgba(167,139,250,0.08)',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(167,139,250,0.15)', color: 'primary.main', borderColor: 'primary.main' },
                    transition: 'all 0.15s',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Results */}
        {query && (
          <>
            <Typography variant="body2" sx={{ color: 'text.disabled', mb: 3 }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </Typography>

            {results.length === 0 ? (
              <Box sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>No results found</Typography>
                <Typography variant="body2" color="text.disabled">Try a different keyword or browse by topic</Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)' },
                  gap: 2.5,
                }}
              >
                {results.map((post) => (
                  <BlogCard key={post.uuid} post={post} />
                ))}
              </Box>
            )}
          </>
        )}

        {/* Empty state */}
        {!query && !loading && (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <SearchOutlined sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Start typing to search articles
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
