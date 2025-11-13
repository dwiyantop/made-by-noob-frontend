import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';

interface SeedPackDetailPageProps {
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

function getSeedPackData(slug: string) {
  // Extract item number from slug if exists (e.g., "seed-packs-item-1" -> 1)
  const match = slug.match(/-item-(\d+)$/);
  const itemIndex = match ? parseInt(match[1], 10) - 1 : 0;

  // Get rarity based on item index
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const rarity = rarities[itemIndex % rarities.length];

  // Generate meaningful item name
  const itemName = `${rarity} Seed Pack`;

  // Get type
  const types = ['Starter', 'Premium', 'Limited'];
  const type = types[itemIndex % types.length];

  // Get image
  const imageUrl = `https://picsum.photos/800/800?random=seed-pack-${itemIndex}`;

  // Get description
  const description = `A ${rarity.toLowerCase()} ${type.toLowerCase()} seed pack containing various seeds for your garden. Open this pack to receive random seeds that can be planted and harvested.`;

  // Get sell price based on rarity
  const prices: Record<string, number> = {
    Common: 100,
    Uncommon: 200,
    Rare: 400,
    Legendary: 800,
    Mythical: 1600,
    Divine: 3200,
    Prismatic: 6400,
    Transcendent: 12800,
  };
  const sellPrice = prices[rarity] || 100;

  // Get how to get text
  const howToGet = `Dibeli dari Toko Seed seharga ${sellPrice} Gems atau diperoleh dari quest rewards.`;

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

  // Generate a few example seed packs for SSG
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: `seed-packs-item-${i}`,
    });
  }

  return params;
}

export async function generateMetadata({ params }: SeedPackDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const seedPackData = getSeedPackData(slug);

  return {
    title: `${seedPackData.name} - Grow a Garden Seed Packs | MadeByNoob`,
    description: `${seedPackData.description} Find complete stats, rarity, contents, and how to obtain this seed pack.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${seedPackData.name.toLowerCase()}`,
      `grow a garden seed packs ${seedPackData.name.toLowerCase()}`,
      `roblox grow a garden ${seedPackData.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${seedPackData.name} - Grow a Garden Seed Packs | MadeByNoob`,
      description: seedPackData.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/seed-packs/${slug}`,
    },
  };
}

export default async function SeedPackDetailPage({ params }: SeedPackDetailPageProps) {
  const { slug } = await params;
  const seedPackData = getSeedPackData(slug);

  const breadcrumbItems = [
    { label: 'Wiki', href: '/grow-a-garden' },
    { label: 'Seed Packs', href: '/grow-a-garden/wiki/seed-packs' },
    { label: seedPackData.name },
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
                src={seedPackData.imageUrl}
                alt={seedPackData.name}
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
                <Heading variant="h1">{seedPackData.name}</Heading>
                {seedPackData.rarity && <RarityBadge rarity={seedPackData.rarity} size="md" />}
              </div>
              <Paragraph size="lg" className="text-text-secondary">
                {seedPackData.description}
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
                  <dd>{seedPackData.rarity && <RarityBadge rarity={seedPackData.rarity} size="sm" />}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Type</dt>
                  <dd className="text-sm text-text-primary">{seedPackData.type}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Sell Price</dt>
                  <dd className="text-sm text-text-primary">{seedPackData.sellPrice.toLocaleString()} Gems</dd>
                </div>
              </dl>
            </div>

            {/* How to Get Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                How to Get
              </Heading>
              <Paragraph className="text-text-primary">{seedPackData.howToGet}</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
