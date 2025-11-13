import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { EggsPageClient } from '@/app/grow-a-garden/wiki/eggs/_components/eggs-page-client';

export const metadata: Metadata = {
  title: 'Grow a Garden Eggs Database | Complete Eggs List | MadeByNoob',
  description:
    'Complete database of all Grow a Garden eggs with rarity, hatch times, and pet counts. Find the best eggs to hatch for rare pets.',
  keywords: [
    'grow a garden eggs',
    'grow a garden eggs list',
    'grow a garden eggs database',
    'grow a garden eggs wiki',
    'roblox grow a garden eggs',
    'grow a garden all eggs',
  ],
  openGraph: {
    title: 'Grow a Garden Eggs Database | MadeByNoob',
    description:
      'Complete database of all Grow a Garden eggs with rarity, hatch times, and pet counts. Find the best eggs to hatch for rare pets.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/eggs`,
  },
};

function getCategoryImage(index: number): string {
  return `https://picsum.photos/400/400?random=egg-${index}`;
}

function getCategoryRarity(
  index: number,
): 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent' {
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  return rarities[index % rarities.length];
}

function getCategoryInfo(index: number): string {
  const types = ['Hatchable', 'Collectible', 'Special'];
  return types[index % types.length];
}

function getHatchTime(index: number): string {
  const times = [
    '5 min',
    '10 min',
    '15 min',
    '30 min',
    '1 hour',
    '2 hours',
    '2 hours 30 min',
    '4 hours',
    '5 hours 30 min',
    '8 hours',
    '12 hours',
    '1 day',
  ];
  return times[index % times.length];
}

function getPetCount(index: number): number {
  const counts = [1, 2, 3, 4, 5];
  return counts[index % counts.length];
}

export default async function EggsPage() {
  // Placeholder data - ~20 eggs
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Eggs Item ${i + 1}`,
    imageUrl: getCategoryImage(i),
    rarity: getCategoryRarity(i),
    info: getCategoryInfo(i),
    hatchTime: getHatchTime(i),
    petCount: getPetCount(i),
    href: `/grow-a-garden/wiki/eggs/eggs-item-${i + 1}`,
  }));

  // Get available types from items
  const availableTypes = Array.from(new Set(items.map(item => item.info).filter(Boolean) as string[])).sort();

  return (
    <Container className="py-12">
      <EggsPageClient items={items} availableTypes={availableTypes} />
    </Container>
  );
}
