'use client';

import { AppBar, Box, Container, styled } from '@mui/material';

export const NavBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(11,11,20,0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
}));

export const NavContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 64,
  padding: '0 24px',
});

export const Logo = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.15rem',
  color: theme.palette.text.primary,
  letterSpacing: '-0.02em',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 6,

  '& span': {
    color: theme.palette.primary.main,
  },
}));

export const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),

  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(0),
  },
}));

export const NavLink = styled('a')(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  padding: '6px 14px',
  borderRadius: 8,
  transition: 'all 0.15s ease',

  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action?.hover,
  },

  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}0D`,
  },
}));
