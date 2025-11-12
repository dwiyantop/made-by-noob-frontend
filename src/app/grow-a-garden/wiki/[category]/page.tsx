import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { CategoryPageClient } from '@/app/grow-a-garden/wiki/[category]/_components/category-page-client';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

function titleCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    eggs: 'Complete database of all Grow a Garden eggs with rarity, hatch times, and pet counts. Find the best eggs to hatch for rare pets.',
    pets: 'Browse all Grow a Garden pets with stats, rarities, and abilities. Discover the best pets for your collection.',
    plants:
      'Complete list of Grow a Garden plants with growth times, sell prices, and farming strategies. Maximize your Sheckles per hour.',
    'seed-packs': 'All Grow a Garden seed packs with contents, rarity, and value. Find the best seed packs to buy.',
    gears:
      'Complete gear database for Grow a Garden. Find the best equipment and tools to improve your farming efficiency.',
    crates:
      'All Grow a Garden crates with drop rates, contents, and rarity. Discover what rewards you can get from each crate.',
    cosmetics:
      'Browse all Grow a Garden cosmetics including skins, accessories, and exclusive items. Customize your character.',
  };
  return descriptions[category.toLowerCase()] || `Browse all ${titleCase(category)} items in Grow a Garden.`;
}

export async function generateStaticParams() {
  const categories = ['eggs', 'pets', 'plants', 'seed-packs', 'gears', 'crates', 'cosmetics'];
  return categories.map(category => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = titleCase(category);
  const description = getCategoryDescription(category);

  return {
    title: `Grow a Garden ${categoryName} Database | Complete ${categoryName} List | MadeByNoob`,
    description,
    keywords: [
      `grow a garden ${category}`,
      `grow a garden ${categoryName.toLowerCase()}`,
      `grow a garden ${category} list`,
      `grow a garden ${category} database`,
      `grow a garden ${category} wiki`,
      `roblox grow a garden ${category}`,
      `grow a garden all ${category}`,
    ],
    openGraph: {
      title: `Grow a Garden ${categoryName} Database | MadeByNoob`,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/${category}`,
    },
  };
}

function getCategoryImage(category: string, index: number): string {
  const categoryLower = category.toLowerCase();
  // Use different image seeds based on category for more relevant placeholders
  const seeds: Record<string, string> = {
    eggs: 'egg',
    pets: 'pet',
    plants: 'plant',
    'seed-packs': 'seed',
    gears: 'gear',
    crates: 'crate',
    cosmetics: 'cosmetic',
  };
  const seed = seeds[categoryLower] || categoryLower;
  return `https://picsum.photos/400/400?random=${seed}-${index}`;
}

function getCategoryRarity(
  index: number,
): 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent' {
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  return rarities[index % rarities.length];
}

function getCategoryInfo(category: string, index: number): string {
  const types: Record<string, string[]> = {
    eggs: ['Hatchable', 'Collectible', 'Special'],
    pets: ['Companion', 'Battle', 'Support'],
    plants: ['Farmable', 'Decorative', 'Rare'],
    'seed-packs': ['Starter', 'Premium', 'Limited'],
    gears: ['Equipment', 'Tool', 'Upgrade'],
    crates: ['Loot', 'Reward', 'Special'],
    cosmetics: ['Skin', 'Accessory', 'Exclusive'],
  };
  const categoryLower = category.toLowerCase();
  const typeList = types[categoryLower] || ['Item'];
  return typeList[index % typeList.length];
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryName = titleCase(category);

  const categoryLower = category.toLowerCase();
  const isEggs = categoryLower === 'eggs';

  // Placeholder data - ~20 items with category-specific images and info
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `${categoryName} Item ${i + 1}`,
    imageUrl: getCategoryImage(category, i),
    rarity: getCategoryRarity(i),
    info: getCategoryInfo(category, i),
    hatchTime: isEggs ? getHatchTime(i) : undefined,
    petCount: isEggs ? getPetCount(i) : undefined,
    href: `/grow-a-garden/wiki/${category}/${category.toLowerCase()}-item-${i + 1}`,
  }));

  // Get available types from items
  const availableTypes = Array.from(new Set(items.map(item => item.info).filter(Boolean) as string[])).sort();

  return (
    <Container className="py-12">
      <CategoryPageClient categoryName={categoryName} items={items} availableTypes={availableTypes} />
    </Container>
  );
}
