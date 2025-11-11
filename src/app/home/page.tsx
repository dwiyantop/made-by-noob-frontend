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
  openGraph: {
    title: 'MadeByNoob: Fast Game Guides, Tools & Wiki',
    description:
      'Stop Guessing. Start Mastering. MadeByNoob provides the fast, clean, and accurate game guides you need to win. Level up your play with more than just a wiki.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen text-text-primary">
      <MainHeader />
      <main>
        <HeroSection />
        <PillarsSection />
        <SupportedGamesSection />
        <FinalCtaSection />
      </main>
      <MainFooter />
    </div>
  );
}
