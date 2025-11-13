import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { ComingSoon } from '@/components/ui/coming-soon';

export const metadata: Metadata = {
  title: 'Grow a Garden Cosmetics Database | Coming Soon | MadeByNoob',
  description: 'Browse all Grow a Garden cosmetics including skins, accessories, and exclusive items. Coming soon.',
  keywords: [
    'grow a garden cosmetics',
    'grow a garden cosmetics list',
    'grow a garden cosmetics database',
    'grow a garden cosmetics wiki',
    'roblox grow a garden cosmetics',
  ],
  openGraph: {
    title: 'Grow a Garden Cosmetics Database | Coming Soon | MadeByNoob',
    description: 'Browse all Grow a Garden cosmetics including skins, accessories, and exclusive items. Coming soon.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/cosmetics`,
  },
};

export default function CosmeticsPage() {
  return (
    <Container className="py-12">
      <ComingSoon
        title="Cosmetics"
        description="We're working hard to bring you the most comprehensive database of all Grow a Garden cosmetics including skins, accessories, and exclusive items. Check back soon!"
      />
    </Container>
  );
}
