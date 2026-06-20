'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toolbar } from '@mui/material';
import { NavBar, NavContainer, Logo, NavLinks, NavLink } from './style';

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
          <Logo component={Link} href="/">
            Gist<span>Nex</span>
          </Logo>

          <NavLinks>
            {links.map(({ label, href }) => (
              <NavLink
                key={href}
                component={Link}
                href={href}
                className={pathname.startsWith(href) ? 'active' : ''}
              >
                {label}
              </NavLink>
            ))}
          </NavLinks>
        </NavContainer>
      </Toolbar>
    </NavBar>
  );
}
