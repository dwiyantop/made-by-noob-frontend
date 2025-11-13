import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';

interface PlantDetailPageProps {
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

function getPlantData(slug: string) {
  // Extract item number from slug if exists (e.g., "plants-item-1" -> 1)
  const match = slug.match(/-item-(\d+)$/);
  const itemIndex = match ? parseInt(match[1], 10) - 1 : 0;

  // Get rarity based on item index
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const rarity = rarities[itemIndex % rarities.length];

  // Generate meaningful item name
  const itemName = `${rarity} Plant`;

  // Get type
  const types = ['Farmable', 'Decorative', 'Rare'];
  const type = types[itemIndex % types.length];

  // Get growth time
  const growthTimes = ['5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '4 hours'];
  const growthTime = growthTimes[itemIndex % growthTimes.length];

  // Get image
  const imageUrl = `https://picsum.photos/800/800?random=plant-${itemIndex}`;

  // Get description
  const description = `A ${rarity.toLowerCase()} ${type.toLowerCase()} plant that can be grown in your garden. This plant yields valuable crops and can be sold for Sheckles. Growth time is ${growthTime}.`;

  // Get sell price based on rarity
  const prices: Record<string, number> = {
    Common: 50,
    Uncommon: 100,
    Rare: 200,
    Legendary: 400,
    Mythical: 800,
    Divine: 1600,
    Prismatic: 3200,
    Transcendent: 6400,
  };
  const sellPrice = prices[rarity] || 50;

  // Get how to get text
  const howToGet = `Dapat ditanam menggunakan seed yang dibeli dari Toko Seed atau diperoleh dari seed packs.`;

  return {
    name: itemName,
    description,
    rarity,
    type,
    imageUrl,
    sellPrice,
    growthTime,
    howToGet,
  };
}

export async function generateStaticParams() {
  const params: Array<{ slug: string }> = [];

  // Generate a few example plants for SSG
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: `plants-item-${i}`,
    });
  }

  return params;
}

export async function generateMetadata({ params }: PlantDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plantData = getPlantData(slug);

  return {
    title: `${plantData.name} - Grow a Garden Plants | MadeByNoob`,
    description: `${plantData.description} Find complete stats, rarity, growth time, and how to obtain this plant.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${plantData.name.toLowerCase()}`,
      `grow a garden plants ${plantData.name.toLowerCase()}`,
      `roblox grow a garden ${plantData.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${plantData.name} - Grow a Garden Plants | MadeByNoob`,
      description: plantData.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/plants/${slug}`,
    },
  };
}

export default async function PlantDetailPage({ params }: PlantDetailPageProps) {
  const { slug } = await params;
  const plantData = getPlantData(slug);

  const breadcrumbItems = [
    { label: 'Wiki', href: '/grow-a-garden' },
    { label: 'Plants', href: '/grow-a-garden/wiki/plants' },
    { label: plantData.name },
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
                src={plantData.imageUrl}
                alt={plantData.name}
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
                <Heading variant="h1">{plantData.name}</Heading>
                {plantData.rarity && <RarityBadge rarity={plantData.rarity} size="md" />}
              </div>
              <Paragraph size="lg" className="text-text-secondary">
                {plantData.description}
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
                  <dd>{plantData.rarity && <RarityBadge rarity={plantData.rarity} size="sm" />}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Type</dt>
                  <dd className="text-sm text-text-primary">{plantData.type}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Growth Time</dt>
                  <dd className="text-sm text-text-primary">{plantData.growthTime}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Sell Price</dt>
                  <dd className="text-sm text-text-primary">{plantData.sellPrice.toLocaleString()} Sheckles</dd>
                </div>
              </dl>
            </div>

            {/* How to Get Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                How to Get
              </Heading>
              <Paragraph className="text-text-primary">{plantData.howToGet}</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
