'use client';

import ReactMarkdown from 'react-markdown';

export default function BlogContent({ content }) {
  return (
    <div className="blog-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
