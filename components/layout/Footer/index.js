import { Box, Container, Divider, Typography } from '@mui/material';
import { Telegram, RssFeedOutlined } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

const pages = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Archive', href: '/archive' },
  { label: 'About', href: '/about' },
];

const social = [
  {
    label: 'Telegram Channel',
    href: 'https://t.me/gistnex',
    icon: <Telegram sx={{ fontSize: 16 }} />,
    external: true,
  },
  {
    label: 'RSS Feed',
    href: '/feed.xml',
    icon: <RssFeedOutlined sx={{ fontSize: 16 }} />,
    external: false,
  },
];

const linkSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'text.secondary',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.15s',
  '&:hover': { color: 'primary.main' },
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Main footer row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr' },
            gap: { xs: 5, md: 8 },
            py: { xs: 6, md: 7 },
          }}
        >
          {/* Brand */}
          <Box>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}>
              <Image
                src="/images/logo-typography.png"
                alt="GistNex"
                width={120}
                height={36}
                style={{ objectFit: 'contain', opacity: 0.9 }}
              />
            </Link>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', lineHeight: 1.7, mt: 2, maxWidth: 280 }}
            >
              Daily tech digest — curated developer news, tools, and insights
              delivered straight to your feed.
            </Typography>
          </Box>

          {/* Pages */}
          <Box>
            <Typography
              variant="overline"
              sx={{ color: 'text.disabled', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', mb: 2, display: 'block' }}
            >
              Pages
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {pages.map(({ label, href }) => (
                <Box key={href} component={Link} href={href} sx={linkSx}>
                  {label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Connect */}
          <Box>
            <Typography
              variant="overline"
              sx={{ color: 'text.disabled', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', mb: 2, display: 'block' }}
            >
              Connect
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {social.map(({ label, href, icon, external }) => (
                <Box
                  key={label}
                  component="a"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  sx={linkSx}
                >
                  {icon}
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} GistNex. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: '#backend', href: '/blog/tag/backend' },
              { label: '#frontend', href: '/blog/tag/frontend' },
              { label: '#devops', href: '/blog/tag/devops' },
            ].map(({ label, href }) => (
              <Box
                key={href}
                component={Link}
                href={href}
                sx={{ fontSize: '0.78rem', color: 'text.disabled', textDecoration: 'none', '&:hover': { color: 'text.secondary' }, transition: 'color 0.15s' }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
