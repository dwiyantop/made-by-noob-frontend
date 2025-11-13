import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';

interface CrateDetailPageProps {
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

function getCrateData(slug: string) {
  // Extract item number from slug if exists (e.g., "crates-item-1" -> 1)
  const match = slug.match(/-item-(\d+)$/);
  const itemIndex = match ? parseInt(match[1], 10) - 1 : 0;

  // Get rarity based on item index
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const rarity = rarities[itemIndex % rarities.length];

  // Generate meaningful item name
  const itemName = `${rarity} Crate`;

  // Get type
  const types = ['Loot', 'Reward', 'Special'];
  const type = types[itemIndex % types.length];

  // Get image
  const imageUrl = `https://picsum.photos/800/800?random=crate-${itemIndex}`;

  // Get description
  const description = `A ${rarity.toLowerCase()} ${type.toLowerCase()} crate that can be opened to receive random rewards. This crate contains valuable items that can help you progress in the game.`;

  // Get sell price based on rarity
  const prices: Record<string, number> = {
    Common: 150,
    Uncommon: 300,
    Rare: 600,
    Legendary: 1200,
    Mythical: 2500,
    Divine: 5000,
    Prismatic: 10000,
    Transcendent: 20000,
  };
  const sellPrice = prices[rarity] || 150;

  // Get how to get text
  const howToGet = `Dapat diperoleh dari quest completion, event rewards, atau dibeli dari Toko Loot seharga ${sellPrice} Gems.`;

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

  // Generate a few example crates for SSG
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: `crates-item-${i}`,
    });
  }

  return params;
}

export async function generateMetadata({ params }: CrateDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const crateData = getCrateData(slug);

  return {
    title: `${crateData.name} - Grow a Garden Crates | MadeByNoob`,
    description: `${crateData.description} Find complete stats, rarity, drop rates, and how to obtain this crate.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${crateData.name.toLowerCase()}`,
      `grow a garden crates ${crateData.name.toLowerCase()}`,
      `roblox grow a garden ${crateData.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${crateData.name} - Grow a Garden Crates | MadeByNoob`,
      description: crateData.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/crates/${slug}`,
    },
  };
}

export default async function CrateDetailPage({ params }: CrateDetailPageProps) {
  const { slug } = await params;
  const crateData = getCrateData(slug);

  const breadcrumbItems = [
    { label: 'Wiki', href: '/grow-a-garden' },
    { label: 'Crates', href: '/grow-a-garden/wiki/crates' },
    { label: crateData.name },
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
                src={crateData.imageUrl}
                alt={crateData.name}
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
                <Heading variant="h1">{crateData.name}</Heading>
                {crateData.rarity && <RarityBadge rarity={crateData.rarity} size="md" />}
              </div>
              <Paragraph size="lg" className="text-text-secondary">
                {crateData.description}
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
                  <dd>{crateData.rarity && <RarityBadge rarity={crateData.rarity} size="sm" />}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Type</dt>
                  <dd className="text-sm text-text-primary">{crateData.type}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Sell Price</dt>
                  <dd className="text-sm text-text-primary">{crateData.sellPrice.toLocaleString()} Gems</dd>
                </div>
              </dl>
            </div>

            {/* How to Get Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                How to Get
              </Heading>
              <Paragraph className="text-text-primary">{crateData.howToGet}</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
