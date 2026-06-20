import './globals.css';
import ThemeProvider from '@/context/ThemeProvider';
import StoreProvider from '@/context/StoreProvider';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: { default: 'GistNex', template: '%s | GistNex' },
  description: 'Daily tech digest — curated content for developers and tech enthusiasts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body>
        <StoreProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
