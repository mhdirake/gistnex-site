'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { IconButton, Toolbar, Tooltip } from '@mui/material';
import { SearchOutlined, CalendarTodayOutlined } from '@mui/icons-material';
import { NavBar, NavContainer, NavLinks, NavLink } from './style';

const links = [
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <NavBar position="fixed" elevation={0}>
      <Toolbar disableGutters>
        <NavContainer maxWidth="lg">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', lineHeight: 0 }}>
            <Image
              src="/images/logo-typography.png"
              alt="GistNex"
              width={130}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          <NavLinks>
            {/* Text links: hidden on xs, visible sm+ */}
            {links.map(({ label, href }) => (
              <NavLink
                key={href}
                component={Link}
                href={href}
                className={pathname.startsWith(href) ? 'active' : ''}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {label}
              </NavLink>
            ))}

            <Tooltip title="Archive" placement="bottom">
              <IconButton
                component={Link}
                href="/archive"
                size="small"
                aria-label="Archive"
                sx={{
                  color: pathname === '/archive' ? 'primary.main' : 'text.secondary',
                  bgcolor: pathname === '/archive' ? 'rgba(167,139,250,0.08)' : 'transparent',
                  ml: 0.5,
                  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                  transition: 'all 0.15s',
                }}
              >
                <CalendarTodayOutlined sx={{ fontSize: 19 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Search" placement="bottom">
              <IconButton
                component={Link}
                href="/search"
                size="small"
                aria-label="Search"
                sx={{
                  color: pathname === '/search' ? 'primary.main' : 'text.secondary',
                  bgcolor: pathname === '/search' ? 'rgba(167,139,250,0.08)' : 'transparent',
                  ml: 0.5,
                  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                  transition: 'all 0.15s',
                }}
              >
                <SearchOutlined sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </NavLinks>
        </NavContainer>
      </Toolbar>
    </NavBar>
  );
}
