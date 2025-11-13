import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { PetsPageClient } from '@/app/grow-a-garden/wiki/pets/_components/pets-page-client';

export const metadata: Metadata = {
  title: 'Grow a Garden Pets Database | Complete Pets List | MadeByNoob',
  description:
    'Browse all Grow a Garden pets with stats, rarities, and abilities. Discover the best pets for your collection.',
  keywords: [
    'grow a garden pets',
    'grow a garden pets list',
    'grow a garden pets database',
    'grow a garden pets wiki',
    'roblox grow a garden pets',
    'grow a garden all pets',
  ],
  openGraph: {
    title: 'Grow a Garden Pets Database | MadeByNoob',
    description:
      'Browse all Grow a Garden pets with stats, rarities, and abilities. Discover the best pets for your collection.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/pets`,
  },
};

function getCategoryImage(index: number): string {
  return `https://picsum.photos/400/400?random=pet-${index}`;
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
  const types = ['Companion', 'Battle', 'Support'];
  return types[index % types.length];
}

export default async function PetsPage() {
  // Placeholder data - ~20 pets
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Pets Item ${i + 1}`,
    imageUrl: getCategoryImage(i),
    rarity: getCategoryRarity(i),
    info: getCategoryInfo(i),
    href: `/grow-a-garden/wiki/pets/pets-item-${i + 1}`,
  }));

  // Get available types from items
  const availableTypes = Array.from(new Set(items.map(item => item.info).filter(Boolean) as string[])).sort();

  return (
    <Container className="py-12">
      <PetsPageClient items={items} availableTypes={availableTypes} />
    </Container>
  );
}
