import { Box, Button, Container, Typography } from '@mui/material';
import { ArrowBackOutlined } from '@mui/icons-material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: '7rem',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            background: 'linear-gradient(135deg, #A78BFA, #22D3EE)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: 'text.primary', mb: 1.5, letterSpacing: '-0.025em' }}
        >
          Page not found
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.7 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/"
          startIcon={<ArrowBackOutlined />}
          sx={{ px: 4, py: 1.3, borderRadius: 2.5, fontWeight: 600, boxShadow: 'none' }}
        >
          Back to home
        </Button>
      </Container>
    </Box>
  );
}
