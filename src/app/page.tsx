import type { Metadata } from 'next';

import { HeroSection } from '@/app/home/_components/hero-section';
import { FinalCtaSection } from '@/components/final-cta-section';
import { MainFooter } from '@/components/main-footer';
import { MainHeader } from '@/components/main-header';
import { PillarsSection } from '@/app/home/_components/pillars-section';
import { SupportedGamesSection } from '@/app/home/_components/supported-games-section';

export const metadata: Metadata = {
  title: 'MadeByNoob: Fast Game Guides, Tools & Wiki',
  description:
    'Stop Guessing. Start Mastering. MadeByNoob provides the fast, clean, and accurate game guides you need to win. Level up your play with more than just a wiki.',
  keywords: [
    'game guides',
    'game wiki',
    'roblox guides',
    'game tools',
    'code tracker',
    'game database',
    'madebynoob',
    'gaming wiki',
    'game strategies',
  ],
  openGraph: {
    title: 'MadeByNoob: Fast Game Guides, Tools & Wiki',
    description:
      'Stop Guessing. Start Mastering. MadeByNoob provides the fast, clean, and accurate game guides you need to win. Level up your play with more than just a wiki.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}`,
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col text-text-primary">
      <MainHeader />
      <main className="flex-1">
        <HeroSection />
        <PillarsSection />
        <SupportedGamesSection />
        <FinalCtaSection />
      </main>
      <MainFooter />
    </div>
  );
}
