import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { ComingSoon } from '@/components/ui/coming-soon';

export const metadata: Metadata = {
  title: 'Grow a Garden Crates Database | Coming Soon | MadeByNoob',
  description: 'All Grow a Garden crates with drop rates, contents, and rarity. Coming soon.',
  keywords: [
    'grow a garden crates',
    'grow a garden crates list',
    'grow a garden crates database',
    'grow a garden crates wiki',
    'roblox grow a garden crates',
  ],
  openGraph: {
    title: 'Grow a Garden Crates Database | Coming Soon | MadeByNoob',
    description: 'All Grow a Garden crates with drop rates, contents, and rarity. Coming soon.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/crates`,
  },
};

export default function CratesPage() {
  return (
    <Container className="py-12">
      <ComingSoon
        title="Crates"
        description="We're working hard to bring you the most comprehensive database of all Grow a Garden crates with drop rates, contents, and rarity. Check back soon!"
      />
    </Container>
  );
}
