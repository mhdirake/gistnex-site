import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/api';

export const runtime = 'nodejs';
export const alt = 'GistNex';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }) {
  const { slug } = await params;
  let title = 'GistNex';
  let summary = 'Tech content digest';
  let tags = [];

  try {
    const data = await getBlogPost(slug);
    if (data?.post) {
      title = data.post.title || title;
      summary = data.post.summary || summary;
      tags = data.post.tags || [];
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #0B0B14 0%, #1A0A2E 100%)',
          padding: '64px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  background: 'rgba(167,139,250,0.15)',
                  border: '1px solid rgba(167,139,250,0.3)',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  color: '#A78BFA',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? '42px' : '52px',
            fontWeight: '800',
            color: '#F1F5F9',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Summary */}
        <div
          style={{
            fontSize: '20px',
            color: '#94A3B8',
            lineHeight: 1.6,
            maxWidth: '800px',
            marginBottom: '40px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          }}
        >
          {summary}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#A78BFA',
              letterSpacing: '-0.01em',
            }}
          >
            GistNex
          </div>
          <div style={{ color: '#2D2D4E', fontSize: '18px' }}>·</div>
          <div style={{ color: '#475569', fontSize: '16px' }}>gistnex.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
