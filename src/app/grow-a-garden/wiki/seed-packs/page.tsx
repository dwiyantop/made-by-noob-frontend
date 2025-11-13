import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { ComingSoon } from '@/components/ui/coming-soon';

export const metadata: Metadata = {
  title: 'Grow a Garden Seed Packs Database | Coming Soon | MadeByNoob',
  description: 'All Grow a Garden seed packs with contents, rarity, and value. Coming soon.',
  keywords: [
    'grow a garden seed packs',
    'grow a garden seed packs list',
    'grow a garden seed packs database',
    'grow a garden seed packs wiki',
    'roblox grow a garden seed packs',
  ],
  openGraph: {
    title: 'Grow a Garden Seed Packs Database | Coming Soon | MadeByNoob',
    description: 'All Grow a Garden seed packs with contents, rarity, and value. Coming soon.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/seed-packs`,
  },
};

export default function SeedPacksPage() {
  return (
    <Container className="py-12">
      <ComingSoon
        title="Seed Packs"
        description="We're working hard to bring you the most comprehensive database of all Grow a Garden seed packs with contents, rarity, and value. Check back soon!"
      />
    </Container>
  );
}
