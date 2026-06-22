'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A78BFA',
      light: '#C4B5FD',
      dark: '#7C3AED',
      contrastText: '#fff',
    },
    secondary: {
      main: '#22D3EE',
      light: '#67E8F9',
      dark: '#0891B2',
      contrastText: '#0F172A',
    },
    background: {
      default: '#0B0B14',
      paper: '#13131F',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
      disabled: '#475569',
    },
    divider: '#1E1E35',
    action: {
      hover: 'rgba(167,139,250,0.08)',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter, Inter, system-ui, sans-serif)',
    h1: { fontWeight: 800, letterSpacing: '-0.04em' },
    h2: { fontWeight: 700, letterSpacing: '-0.03em' },
    h3: { fontWeight: 700, letterSpacing: '-0.025em' },
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 100%)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        'html, body': { margin: 0, padding: 0 },
      },
    },
  },
});

export default theme;
