import type { Metadata } from 'next';

import { CodeCard } from './_components/code-card';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';

export const metadata: Metadata = {
  title: 'Grow a Garden Codes | Active & Expired Promo Codes | MadeByNoob',
  description:
    'Find all active and expired Grow a Garden promo codes. Get free gems, pets, seed packs, and more. Updated regularly with verified codes.',
  keywords: [
    'grow a garden codes',
    'grow a garden promo codes',
    'grow a garden free codes',
    'grow a garden active codes',
    'grow a garden codes 2024',
    'roblox grow a garden codes',
    'grow a garden redeem codes',
  ],
  openGraph: {
    title: 'Grow a Garden Codes | Active & Expired Promo Codes | MadeByNoob',
    description:
      'Find all active and expired Grow a Garden promo codes. Get free gems, pets, seed packs, and more. Updated regularly with verified codes.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/codes`,
  },
};

const activeCodes = [
  {
    code: 'WELCOME',
    reward: '100 Gems & 1 Free Pet',
  },
  {
    code: 'GROW2024',
    reward: '500 Gems & 2 Seed Packs',
  },
  {
    code: 'GARDENPARTY',
    reward: '250 Gems & 1 Rare Pet Egg',
  },
  {
    code: 'SPRING2024',
    reward: '300 Gems & 5 Plant Seeds',
  },
];

const expiredCodes = [
  {
    code: 'WINTER2023',
    reward: '200 Gems & 1 Pet',
  },
  {
    code: 'LAUNCH',
    reward: '1000 Gems & 5 Pet Eggs',
  },
];

export default function CodesPage() {
  const lastVerified = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <Heading variant="h1">Grow a Garden Codes</Heading>
          <div className="flex items-center gap-1.5">
            <span className="i-lucide-shield-check h-4 w-4 text-green-500" aria-hidden />
            <Paragraph size="sm" className="text-text-secondary">
              Last Verified: {lastVerified}
            </Paragraph>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Heading variant="h2" className="mt-8">
              Active Codes
            </Heading>
            <div className="space-y-3">
              {activeCodes.map(code => (
                <CodeCard key={code.code} code={code.code} reward={code.reward} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Heading variant="h2" className="mt-8">
              Expired Codes
            </Heading>
            <div className="space-y-3">
              {expiredCodes.map(code => (
                <CodeCard key={code.code} code={code.code} reward={code.reward} expired />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
