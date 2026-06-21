'use client';

import ReactMarkdown from 'react-markdown';
import { Box } from '@mui/material';

export default function BlogContent({ content }) {
  return (
    <Box
      className="blog-content"
      sx={{
        fontSize: { xs: '1rem', md: '1.075rem' },
        lineHeight: 1.85,
        color: 'text.primary',
        '& > *:first-of-type': { mt: 0 },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
}
