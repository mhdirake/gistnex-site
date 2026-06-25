'use client';

import { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { ThumbUpOutlined, ThumbDownOutlined, VisibilityOutlined } from '@mui/icons-material';
import axiosClient from '@/lib/axiosClient';

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

export default function PostReactions({ slug, initialViewCount, initialLikeCount, initialDislikeCount }) {
  const storageKey = `gistnex_reaction_${slug}`;

  const [viewCount, setViewCount] = useState(initialViewCount);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [userVote, setUserVote] = useState(null); // 'like' | 'dislike' | null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Read persisted vote
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'like' || saved === 'dislike') setUserVote(saved);
    } catch {}

    // Fire-and-forget view increment
    axiosClient.post(`/api/client/blog/${slug}/view`).then((res) => {
      if (res.data?.viewCount != null) setViewCount(res.data.viewCount);
    }).catch(() => {});
  }, [slug, storageKey]);

  const callReact = async (type, delta) => {
    const res = await axiosClient.post(`/api/client/blog/${slug}/react`, { type, delta });
    return res.data;
  };

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (userVote === 'like') {
        // Undo like
        setLikeCount((c) => Math.max(0, c - 1));
        setUserVote(null);
        localStorage.removeItem(storageKey);
        await callReact('like', -1);
      } else if (userVote === 'dislike') {
        // Switch dislike → like
        setDislikeCount((c) => Math.max(0, c - 1));
        setLikeCount((c) => c + 1);
        setUserVote('like');
        localStorage.setItem(storageKey, 'like');
        await callReact('dislike', -1);
        await callReact('like', 1);
      } else {
        // New like
        setLikeCount((c) => c + 1);
        setUserVote('like');
        localStorage.setItem(storageKey, 'like');
        await callReact('like', 1);
      }
    } catch {}
    setLoading(false);
  };

  const handleDislike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (userVote === 'dislike') {
        // Undo dislike
        setDislikeCount((c) => Math.max(0, c - 1));
        setUserVote(null);
        localStorage.removeItem(storageKey);
        await callReact('dislike', -1);
      } else if (userVote === 'like') {
        // Switch like → dislike
        setLikeCount((c) => Math.max(0, c - 1));
        setDislikeCount((c) => c + 1);
        setUserVote('dislike');
        localStorage.setItem(storageKey, 'dislike');
        await callReact('like', -1);
        await callReact('dislike', 1);
      } else {
        // New dislike
        setDislikeCount((c) => c + 1);
        setUserVote('dislike');
        localStorage.setItem(storageKey, 'dislike');
        await callReact('dislike', 1);
      }
    } catch {}
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        mt: 5,
        mb: 3,
        py: 2,
        px: 2.5,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'rgba(255,255,255,0.02)',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {/* Views */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.disabled' }}>
        <VisibilityOutlined sx={{ fontSize: 16 }} />
        <Typography variant="body2" sx={{ fontSize: '0.82rem', fontVariantNumeric: 'tabular-nums' }}>
          {formatCount(viewCount)}
        </Typography>
      </Box>

      {/* Like + Dislike */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
        <Tooltip title={userVote === 'like' ? 'Remove like' : 'Like'} placement="top">
          <span>
            <IconButton
              size="small"
              onClick={handleLike}
              disabled={loading}
              sx={{
                color: userVote === 'like' ? 'primary.main' : 'text.disabled',
                transition: 'color 0.15s, transform 0.1s',
                '&:hover': { color: 'primary.main', transform: 'scale(1.12)' },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              <ThumbUpOutlined sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>
        <Typography
          variant="body2"
          sx={{
            minWidth: 24,
            textAlign: 'center',
            fontSize: '0.82rem',
            fontVariantNumeric: 'tabular-nums',
            color: userVote === 'like' ? 'primary.main' : 'text.disabled',
            transition: 'color 0.15s',
          }}
        >
          {formatCount(likeCount)}
        </Typography>

        <Box sx={{ width: 1, height: 16, bgcolor: 'divider', mx: 0.5 }} />

        <Tooltip title={userVote === 'dislike' ? 'Remove dislike' : 'Dislike'} placement="top">
          <span>
            <IconButton
              size="small"
              onClick={handleDislike}
              disabled={loading}
              sx={{
                color: userVote === 'dislike' ? 'error.main' : 'text.disabled',
                transition: 'color 0.15s, transform 0.1s',
                '&:hover': { color: 'error.main', transform: 'scale(1.12)' },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              <ThumbDownOutlined sx={{ fontSize: 18 }} />
            </IconButton>
          </span>
        </Tooltip>
        <Typography
          variant="body2"
          sx={{
            minWidth: 24,
            textAlign: 'center',
            fontSize: '0.82rem',
            fontVariantNumeric: 'tabular-nums',
            color: userVote === 'dislike' ? 'error.main' : 'text.disabled',
            transition: 'color 0.15s',
          }}
        >
          {formatCount(dislikeCount)}
        </Typography>
      </Box>
    </Box>
  );
}
