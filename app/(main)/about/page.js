import { Box, Container, Divider, Typography } from '@mui/material';
import { Telegram } from '@mui/icons-material';

export const metadata = {
  title: 'About',
  description: 'What is GistNex and how it works.',
};

export default function AboutPage() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'text.primary',
            mb: 2,
          }}
        >
          About GistNex
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4 }}>
          GistNex is a tech content digest published daily to a Telegram channel.
          It aggregates the most relevant developer news, open-source releases, tools,
          and articles — so you can stay informed without the noise.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight={600} gutterBottom color="text.primary">
          How it works
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2, mb: 5 }}>
          {[
            {
              step: '01',
              title: 'Sources collected',
              body: 'Content is pulled from carefully chosen RSS feeds and tech publications around the clock.',
            },
            {
              step: '02',
              title: 'Filtered and summarised',
              body: 'Each item is reviewed and distilled to the essential point — no filler.',
            },
            {
              step: '03',
              title: 'Published to Telegram',
              body: 'The digest lands in the channel daily, straight to your pocket.',
            },
          ].map(({ step, title, body }) => (
            <Box key={step} sx={{ display: 'flex', gap: 2.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: 'primary.main',
                  letterSpacing: '0.05em',
                  minWidth: 28,
                  pt: 0.25,
                }}
              >
                {step}
              </Typography>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {body}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            bgcolor: '#1A1A2E',
            border: '1px solid #2D2D4E',
            borderRadius: 3,
            p: 3.5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <Telegram sx={{ color: 'primary.main', fontSize: 26, mt: 0.25 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary" gutterBottom>
              Join the channel
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 1.5 }}>
              Get the daily digest directly in Telegram.
            </Typography>
            <Box
              component="a"
              href="https://t.me/gistnex"
              target="_blank"
              rel="noopener"
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              t.me/gistnex →
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
