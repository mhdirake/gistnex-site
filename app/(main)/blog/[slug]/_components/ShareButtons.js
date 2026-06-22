'use client';

import { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Telegram, LinkOutlined, CheckOutlined } from '@mui/icons-material';

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.633 5.906-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false);

  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.8rem', mr: 0.5 }}>
        Share
      </Typography>

      <Tooltip title="Share on Telegram">
        <IconButton
          component="a"
          href={telegramHref}
          target="_blank"
          rel="noopener"
          size="small"
          sx={{
            color: 'text.secondary',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1.5,
            width: 34,
            height: 34,
            '&:hover': { color: '#29B6F6', borderColor: '#29B6F6', bgcolor: 'rgba(41,182,246,0.08)' },
            transition: 'all 0.15s',
          }}
        >
          <Telegram sx={{ fontSize: 17 }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on X">
        <IconButton
          component="a"
          href={twitterHref}
          target="_blank"
          rel="noopener"
          size="small"
          sx={{
            color: 'text.secondary',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1.5,
            width: 34,
            height: 34,
            '&:hover': { color: 'text.primary', borderColor: 'text.secondary', bgcolor: 'rgba(255,255,255,0.05)' },
            transition: 'all 0.15s',
          }}
        >
          <XIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title={copied ? 'Copied!' : 'Copy link'}>
        <IconButton
          onClick={copyLink}
          size="small"
          sx={{
            color: copied ? 'primary.main' : 'text.secondary',
            border: '1px solid',
            borderColor: copied ? 'primary.main' : 'divider',
            borderRadius: 1.5,
            width: 34,
            height: 34,
            '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'rgba(167,139,250,0.08)' },
            transition: 'all 0.15s',
          }}
        >
          {copied ? <CheckOutlined sx={{ fontSize: 17 }} /> : <LinkOutlined sx={{ fontSize: 17 }} />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
