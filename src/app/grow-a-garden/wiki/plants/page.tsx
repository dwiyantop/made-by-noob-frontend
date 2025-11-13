import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { ComingSoon } from '@/components/ui/coming-soon';

export const metadata: Metadata = {
  title: 'Grow a Garden Plants Database | Coming Soon | MadeByNoob',
  description:
    'Complete list of Grow a Garden plants with growth times, sell prices, and farming strategies. Coming soon.',
  keywords: [
    'grow a garden plants',
    'grow a garden plants list',
    'grow a garden plants database',
    'grow a garden plants wiki',
    'roblox grow a garden plants',
  ],
  openGraph: {
    title: 'Grow a Garden Plants Database | Coming Soon | MadeByNoob',
    description:
      'Complete list of Grow a Garden plants with growth times, sell prices, and farming strategies. Coming soon.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/plants`,
  },
};

export default function PlantsPage() {
  return (
    <Container className="py-12">
      <ComingSoon
        title="Plants"
        description="We're working hard to bring you the most comprehensive database of all Grow a Garden plants with growth times, sell prices, and farming strategies. Check back soon!"
      />
    </Container>
  );
}
