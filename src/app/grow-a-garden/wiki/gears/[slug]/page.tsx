import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';

interface GearDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function titleCase(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getGearData(slug: string) {
  // Extract item number from slug if exists (e.g., "gears-item-1" -> 1)
  const match = slug.match(/-item-(\d+)$/);
  const itemIndex = match ? parseInt(match[1], 10) - 1 : 0;

  // Get rarity based on item index
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const rarity = rarities[itemIndex % rarities.length];

  // Generate meaningful item name
  const itemName = `${rarity} Gear`;

  // Get type
  const types = ['Equipment', 'Tool', 'Upgrade'];
  const type = types[itemIndex % types.length];

  // Get image
  const imageUrl = `https://picsum.photos/800/800?random=gear-${itemIndex}`;

  // Get description
  const description = `A ${rarity.toLowerCase()} piece of ${type.toLowerCase()} that enhances your farming capabilities. This gear provides useful bonuses and improvements to your gameplay.`;

  // Get sell price based on rarity
  const prices: Record<string, number> = {
    Common: 200,
    Uncommon: 400,
    Rare: 800,
    Legendary: 1600,
    Mythical: 3200,
    Divine: 6400,
    Prismatic: 12800,
    Transcendent: 25600,
  };
  const sellPrice = prices[rarity] || 200;

  // Get how to get text
  const howToGet = `Dibeli dari Toko Equipment seharga ${sellPrice} Gems atau diperoleh dari crate rewards.`;

  return {
    name: itemName,
    description,
    rarity,
    type,
    imageUrl,
    sellPrice,
    howToGet,
  };
}

export async function generateStaticParams() {
  const params: Array<{ slug: string }> = [];

  // Generate a few example gears for SSG
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: `gears-item-${i}`,
    });
  }

  return params;
}

export async function generateMetadata({ params }: GearDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gearData = getGearData(slug);

  return {
    title: `${gearData.name} - Grow a Garden Gears | MadeByNoob`,
    description: `${gearData.description} Find complete stats, rarity, bonuses, and how to obtain this gear.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${gearData.name.toLowerCase()}`,
      `grow a garden gears ${gearData.name.toLowerCase()}`,
      `roblox grow a garden ${gearData.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${gearData.name} - Grow a Garden Gears | MadeByNoob`,
      description: gearData.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/gears/${slug}`,
    },
  };
}

export default async function GearDetailPage({ params }: GearDetailPageProps) {
  const { slug } = await params;
  const gearData = getGearData(slug);

  const breadcrumbItems = [
    { label: 'Wiki', href: '/grow-a-garden' },
    { label: 'Gears', href: '/grow-a-garden/wiki/gears' },
    { label: gearData.name },
  ];

  return (
    <Container className="py-12">
      <div className="space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column - Visual */}
          <div className="md:col-span-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-card/40">
              <ImageLoader
                src={gearData.imageUrl}
                alt={gearData.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
                fallbackClassName="bg-card/90"
              />
            </div>
          </div>

          {/* Right Column - Data */}
          <div className="md:col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heading variant="h1">{gearData.name}</Heading>
                {gearData.rarity && <RarityBadge rarity={gearData.rarity} size="md" />}
              </div>
              <Paragraph size="lg" className="text-text-secondary">
                {gearData.description}
              </Paragraph>
            </div>

            {/* Stats Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                Stats
              </Heading>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Rarity</dt>
                  <dd>{gearData.rarity && <RarityBadge rarity={gearData.rarity} size="sm" />}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Type</dt>
                  <dd className="text-sm text-text-primary">{gearData.type}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Sell Price</dt>
                  <dd className="text-sm text-text-primary">{gearData.sellPrice.toLocaleString()} Gems</dd>
                </div>
              </dl>
            </div>

            {/* How to Get Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                How to Get
              </Heading>
              <Paragraph className="text-text-primary">{gearData.howToGet}</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
