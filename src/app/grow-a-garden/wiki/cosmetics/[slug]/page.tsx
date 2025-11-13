import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';

interface CosmeticDetailPageProps {
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

function getCosmeticData(slug: string) {
  // Extract item number from slug if exists (e.g., "cosmetics-item-1" -> 1)
  const match = slug.match(/-item-(\d+)$/);
  const itemIndex = match ? parseInt(match[1], 10) - 1 : 0;

  // Get rarity based on item index
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const rarity = rarities[itemIndex % rarities.length];

  // Generate meaningful item name
  const itemName = `${rarity} Cosmetic`;

  // Get type
  const types = ['Skin', 'Accessory', 'Exclusive'];
  const type = types[itemIndex % types.length];

  // Get image
  const imageUrl = `https://picsum.photos/800/800?random=cosmetic-${itemIndex}`;

  // Get description
  const description = `A ${rarity.toLowerCase()} ${type.toLowerCase()} cosmetic item that allows you to customize your character's appearance. This item is purely aesthetic and does not affect gameplay.`;

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
  const howToGet = `Dibeli dari Toko Cosmetics seharga ${sellPrice} Gems atau diperoleh dari special events.`;

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

  // Generate a few example cosmetics for SSG
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: `cosmetics-item-${i}`,
    });
  }

  return params;
}

export async function generateMetadata({ params }: CosmeticDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cosmeticData = getCosmeticData(slug);

  return {
    title: `${cosmeticData.name} - Grow a Garden Cosmetics | MadeByNoob`,
    description: `${cosmeticData.description} Find complete stats, rarity, and how to obtain this cosmetic item.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${cosmeticData.name.toLowerCase()}`,
      `grow a garden cosmetics ${cosmeticData.name.toLowerCase()}`,
      `roblox grow a garden ${cosmeticData.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${cosmeticData.name} - Grow a Garden Cosmetics | MadeByNoob`,
      description: cosmeticData.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/cosmetics/${slug}`,
    },
  };
}

export default async function CosmeticDetailPage({ params }: CosmeticDetailPageProps) {
  const { slug } = await params;
  const cosmeticData = getCosmeticData(slug);

  const breadcrumbItems = [
    { label: 'Wiki', href: '/grow-a-garden' },
    { label: 'Cosmetics', href: '/grow-a-garden/wiki/cosmetics' },
    { label: cosmeticData.name },
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
                src={cosmeticData.imageUrl}
                alt={cosmeticData.name}
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
                <Heading variant="h1">{cosmeticData.name}</Heading>
                {cosmeticData.rarity && <RarityBadge rarity={cosmeticData.rarity} size="md" />}
              </div>
              <Paragraph size="lg" className="text-text-secondary">
                {cosmeticData.description}
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
                  <dd>{cosmeticData.rarity && <RarityBadge rarity={cosmeticData.rarity} size="sm" />}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Type</dt>
                  <dd className="text-sm text-text-primary">{cosmeticData.type}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Sell Price</dt>
                  <dd className="text-sm text-text-primary">{cosmeticData.sellPrice.toLocaleString()} Gems</dd>
                </div>
              </dl>
            </div>

            {/* How to Get Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                How to Get
              </Heading>
              <Paragraph className="text-text-primary">{cosmeticData.howToGet}</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
