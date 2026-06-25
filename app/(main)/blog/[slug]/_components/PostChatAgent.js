'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import {
  AutoAwesomeRounded,
  CloseRounded,
  SendRounded,
  ChatBubbleOutlineRounded,
} from '@mui/icons-material';
import axiosClient from '@/lib/axiosClient';

const SUGGESTIONS = ['Summarize this post', 'What are the key takeaways?'];

function TypingDots() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', py: 0.25 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            '@keyframes typingBounce': {
              '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.5 },
              '30%': { transform: 'translateY(-5px)', opacity: 1 },
            },
            animation: 'typingBounce 1.2s ease infinite',
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </Box>
  );
}

export default function PostChatAgent({ slug, postTitle }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function handleSend() {
    const question = input.trim();
    if (!question || loading) return;

    const userMsg = { role: 'user', content: question };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axiosClient.post(`/api/client/blog/${slug}/chat`, {
        question,
        history: messages.slice(-6),
      });
      const aiMsg = { role: 'assistant', content: data.answer };
      setMessages([...nextMessages, aiMsg]);
      if (!open) setUnread((v) => v + 1);
    } catch {
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendWithText(text) {
    const question = text.trim();
    if (!question || loading) return;

    const userMsg = { role: 'user', content: question };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const { data } = await axiosClient.post(`/api/client/blog/${slug}/chat`, {
        question,
        history: messages.slice(-6),
      });
      setMessages([...nextMessages, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Panel */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 84, sm: 92 },
          right: { xs: 16, sm: 28 },
          width: { xs: 'calc(100vw - 32px)', sm: 380 },
          maxWidth: 380,
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'column',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          pointerEvents: open ? 'auto' : 'none',
          transformOrigin: 'bottom right',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: { xs: 460, sm: 500 },
            borderRadius: '20px 20px 6px 20px',
            overflow: 'hidden',
            bgcolor: '#070711',
            border: '1px solid rgba(167,139,250,0.14)',
            boxShadow: '0 32px 72px rgba(0,0,0,0.7), 0 0 0 1px rgba(167,139,250,0.06)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '15%',
              right: '15%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)',
              zIndex: 1,
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 100%)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: '9px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(109,40,217,0.15))',
                border: '1px solid rgba(124,58,237,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AutoAwesomeRounded sx={{ fontSize: 15, color: '#C4B5FD' }} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#E2D9F3',
                  letterSpacing: '0.01em',
                  lineHeight: 1.2,
                }}
              >
                GistNex AI
              </Typography>
              <Typography
                noWrap
                sx={{
                  fontSize: '0.67rem',
                  color: 'rgba(255,255,255,0.28)',
                  lineHeight: 1.2,
                  mt: 0.2,
                }}
              >
                {postTitle}
              </Typography>
            </Box>

            {/* Status dot */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mr: 0.5 }}>
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: '#34D399',
                  boxShadow: '0 0 6px rgba(52,211,153,0.7)',
                  '@keyframes statusPulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.35 },
                  },
                  animation: 'statusPulse 2.2s ease-in-out infinite',
                }}
              />
              <Typography sx={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.04em' }}>
                online
              </Typography>
            </Box>

            <Box
              onClick={() => setOpen(false)}
              sx={{
                width: 26,
                height: 26,
                borderRadius: '7px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.28)',
                transition: 'all 0.15s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' },
              }}
            >
              <CloseRounded sx={{ fontSize: 15 }} />
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&::-webkit-scrollbar': { width: 3 },
              '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 4,
                bgcolor: 'rgba(167,139,250,0.18)',
              },
            }}
          >
            {messages.length === 0 && (
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: 2.5,
                  py: 2,
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(109,40,217,0.08))',
                    border: '1px solid rgba(124,58,237,0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '@keyframes floatIcon': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-4px)' },
                    },
                    animation: 'floatIcon 3s ease-in-out infinite',
                  }}
                >
                  <AutoAwesomeRounded sx={{ fontSize: 22, color: '#C4B5FD' }} />
                </Box>

                <Box>
                  <Typography
                    sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', mb: 0.5 }}
                  >
                    Ask me anything
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.74rem',
                      color: 'rgba(255,255,255,0.28)',
                      lineHeight: 1.65,
                      maxWidth: 210,
                    }}
                  >
                    I&apos;ve read this article and I&apos;m ready to answer your questions about it.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.875, width: '100%' }}>
                  {SUGGESTIONS.map((s) => (
                    <Box
                      key={s}
                      onClick={() => handleSendWithText(s)}
                      sx={{
                        px: 1.5,
                        py: 0.9,
                        borderRadius: '10px',
                        border: '1px solid rgba(167,139,250,0.13)',
                        color: 'rgba(255,255,255,0.42)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                        '&:hover': {
                          borderColor: 'rgba(167,139,250,0.35)',
                          color: 'rgba(255,255,255,0.75)',
                          bgcolor: 'rgba(124,58,237,0.07)',
                        },
                      }}
                    >
                      {s}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <Box
                  sx={{
                    maxWidth: '87%',
                    px: 1.5,
                    py: 1,
                    ...(msg.role === 'user'
                      ? {
                          borderRadius: '14px 14px 3px 14px',
                          background: 'linear-gradient(145deg, #7C3AED 0%, #5B21B6 100%)',
                          boxShadow: '0 2px 16px rgba(124,58,237,0.3)',
                        }
                      : {
                          borderRadius: '14px 14px 14px 3px',
                          bgcolor: 'rgba(255,255,255,0.038)',
                          borderLeft: '2px solid rgba(124,58,237,0.55)',
                          border: '1px solid rgba(255,255,255,0.055)',
                          borderLeft: '2px solid rgba(124,58,237,0.55)',
                        }),
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.82rem',
                      lineHeight: 1.7,
                      color: msg.role === 'user' ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.8)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.content}
                  </Typography>
                </Box>
              </Box>
            ))}

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box
                  sx={{
                    px: 1.75,
                    py: 1.1,
                    borderRadius: '14px 14px 14px 3px',
                    bgcolor: 'rgba(255,255,255,0.038)',
                    border: '1px solid rgba(255,255,255,0.055)',
                    borderLeft: '2px solid rgba(124,58,237,0.55)',
                  }}
                >
                  <TypingDots />
                </Box>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            sx={{
              px: 1.5,
              py: 1.25,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 0.875,
              bgcolor: 'rgba(0,0,0,0.2)',
            }}
          >
            <TextField
              inputRef={inputRef}
              fullWidth
              multiline
              maxRows={3}
              size="small"
              placeholder="Ask a question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.82rem',
                  bgcolor: 'transparent',
                  borderRadius: '10px',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.07)' },
                  '&:hover fieldset': { borderColor: 'rgba(167,139,250,0.25)' },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(124,58,237,0.5)',
                    borderWidth: '1px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: 'rgba(255,255,255,0.82)',
                  '&::placeholder': { color: 'rgba(255,255,255,0.2)', opacity: 1 },
                },
              }}
            />
            <Box
              onClick={handleSend}
              sx={{
                width: 34,
                height: 34,
                flexShrink: 0,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && !loading ? 'pointer' : 'default',
                transition: 'all 0.18s ease',
                ...(input.trim() && !loading
                  ? {
                      background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
                      boxShadow: '0 2px 12px rgba(124,58,237,0.4)',
                      '&:hover': {
                        transform: 'scale(1.06)',
                        boxShadow: '0 4px 18px rgba(124,58,237,0.5)',
                      },
                      '&:active': { transform: 'scale(0.95)' },
                    }
                  : {
                      bgcolor: 'rgba(255,255,255,0.04)',
                    }),
              }}
            >
              <SendRounded
                sx={{
                  fontSize: 15,
                  color: input.trim() && !loading ? '#fff' : 'rgba(255,255,255,0.18)',
                  transform: 'rotate(-8deg)',
                  transition: 'color 0.18s',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Floating bubble */}
      <Box
        sx={{
          position: 'fixed',
          bottom: { xs: 24, sm: 28 },
          right: { xs: 16, sm: 28 },
          zIndex: 1300,
        }}
      >
        {/* Pulse ring — only when closed */}
        {!open && (
          <Box
            sx={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              opacity: 0,
              pointerEvents: 'none',
              '@keyframes fabRing': {
                '0%': { transform: 'scale(0.85)', opacity: 0.5 },
                '100%': { transform: 'scale(1.65)', opacity: 0 },
              },
              animation: 'fabRing 2.8s ease-out infinite',
            }}
          />
        )}

        <Box
          onClick={() => setOpen((v) => !v)}
          role="button"
          aria-label={open ? 'Close chat' : 'Ask AI about this post'}
          sx={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            background: open
              ? 'linear-gradient(135deg, #4C1D95, #3B0764)'
              : 'linear-gradient(145deg, #7C3AED 0%, #5B21B6 100%)',
            boxShadow: open
              ? '0 4px 20px rgba(0,0,0,0.5)'
              : '0 4px 28px rgba(124,58,237,0.5), 0 1px 4px rgba(0,0,0,0.3)',
            transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
            '&:hover': {
              transform: 'scale(1.08)',
              boxShadow: '0 6px 36px rgba(124,58,237,0.6)',
            },
            '&:active': { transform: 'scale(0.93)' },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s, transform 0.15s',
              opacity: open ? 0 : 1,
              transform: open ? 'scale(0.7) rotate(-30deg)' : 'scale(1) rotate(0deg)',
            }}
          >
            <ChatBubbleOutlineRounded sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s, transform 0.15s',
              opacity: open ? 1 : 0,
              transform: open ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(30deg)',
            }}
          >
            <CloseRounded sx={{ color: '#fff', fontSize: 20 }} />
          </Box>

          {/* Unread badge */}
          {unread > 0 && !open && (
            <Box
              sx={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 18,
                height: 18,
                borderRadius: '50%',
                bgcolor: '#EF4444',
                border: '2px solid #070711',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '@keyframes badgePop': {
                  '0%': { transform: 'scale(0)' },
                  '70%': { transform: 'scale(1.2)' },
                  '100%': { transform: 'scale(1)' },
                },
                animation: 'badgePop 0.3s ease-out forwards',
              }}
            >
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                {unread}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
