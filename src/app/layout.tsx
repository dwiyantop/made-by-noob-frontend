import type { Metadata, Viewport } from 'next';
import { Figtree } from 'next/font/google';
import { PageBackground } from '@/components/page-background';
import { PreventZoom } from '@/components/prevent-zoom';
import { ScrollToTop } from '@/components/scroll-to-top';
import './globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: 'MadeByNoob: Fast Game Guides, Tools & Wiki',
    template: '%s | MadeByNoob',
  },
  description:
    'Stop Guessing. Start Mastering. MadeByNoob provides the fast, clean, and accurate game guides you need to win. Level up your play with more than just a wiki.',
  keywords: ['game guides', 'game wiki', 'roblox guides', 'game tools', 'code tracker', 'game database'],
  authors: [{ name: 'MadeByNoob' }],
  creator: 'MadeByNoob',
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MadeByNoob',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${figtree.variable} antialiased`}>
        <PreventZoom />
        <PageBackground />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
