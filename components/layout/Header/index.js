'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Toolbar } from '@mui/material';
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
