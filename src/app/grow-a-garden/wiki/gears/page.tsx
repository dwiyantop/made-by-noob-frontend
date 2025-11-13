import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { ComingSoon } from '@/components/ui/coming-soon';

export const metadata: Metadata = {
  title: 'Grow a Garden Gears Database | Coming Soon | MadeByNoob',
  description: 'Complete gear database for Grow a Garden. Find the best equipment and tools. Coming soon.',
  keywords: [
    'grow a garden gears',
    'grow a garden gears list',
    'grow a garden gears database',
    'grow a garden gears wiki',
    'roblox grow a garden gears',
  ],
  openGraph: {
    title: 'Grow a Garden Gears Database | Coming Soon | MadeByNoob',
    description: 'Complete gear database for Grow a Garden. Find the best equipment and tools. Coming soon.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/gears`,
  },
};

export default function GearsPage() {
  return (
    <Container className="py-12">
      <ComingSoon
        title="Gears"
        description="We're working hard to bring you the most comprehensive database of all Grow a Garden gears, equipment, and tools. Check back soon!"
      />
    </Container>
  );
}
