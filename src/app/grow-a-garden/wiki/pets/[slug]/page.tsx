import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';

interface PetDetailPageProps {
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

function getPetData(slug: string) {
  // Extract item number from slug if exists (e.g., "pets-item-1" -> 1)
  const match = slug.match(/-item-(\d+)$/);
  const itemIndex = match ? parseInt(match[1], 10) - 1 : 0;

  // Get rarity based on item index
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const rarity = rarities[itemIndex % rarities.length];

  // Generate meaningful item name
  const itemName = `${rarity} Pet`;

  // Get type
  const types = ['Companion', 'Battle', 'Support'];
  const type = types[itemIndex % types.length];

  // Get stats
  const stats = {
    attack: 10 + itemIndex * 5,
    defense: 8 + itemIndex * 4,
    speed: 12 + itemIndex * 3,
  };

  // Get image
  const imageUrl = `https://picsum.photos/800/800?random=pet-${itemIndex}`;

  // Get description
  const description = `A ${rarity.toLowerCase()} ${type.toLowerCase()} pet companion that can assist you in your farming adventures. This pet has unique abilities and stats that make it valuable for your collection.`;

  // Get sell price based on rarity
  const prices: Record<string, number> = {
    Common: 300,
    Uncommon: 600,
    Rare: 1200,
    Legendary: 2400,
    Mythical: 5000,
    Divine: 10000,
    Prismatic: 20000,
    Transcendent: 40000,
  };
  const sellPrice = prices[rarity] || 300;

  // Get how to get text
  const howToGet = `Dapat diperoleh dengan menetas dari ${rarity} Egg.`;

  return {
    name: itemName,
    description,
    rarity,
    type,
    imageUrl,
    sellPrice,
    stats,
    howToGet,
  };
}

export async function generateStaticParams() {
  const params: Array<{ slug: string }> = [];

  // Generate a few example pets for SSG
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: `pets-item-${i}`,
    });
  }

  return params;
}

export async function generateMetadata({ params }: PetDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const petData = getPetData(slug);

  return {
    title: `${petData.name} - Grow a Garden Pets | MadeByNoob`,
    description: `${petData.description} Find complete stats, rarity, abilities, and how to obtain this pet.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${petData.name.toLowerCase()}`,
      `grow a garden pets ${petData.name.toLowerCase()}`,
      `roblox grow a garden ${petData.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${petData.name} - Grow a Garden Pets | MadeByNoob`,
      description: petData.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/pets/${slug}`,
    },
  };
}

export default async function PetDetailPage({ params }: PetDetailPageProps) {
  const { slug } = await params;
  const petData = getPetData(slug);

  const breadcrumbItems = [
    { label: 'Wiki', href: '/grow-a-garden' },
    { label: 'Pets', href: '/grow-a-garden/wiki/pets' },
    { label: petData.name },
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
                src={petData.imageUrl}
                alt={petData.name}
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
                <Heading variant="h1">{petData.name}</Heading>
                {petData.rarity && <RarityBadge rarity={petData.rarity} size="md" />}
              </div>
              <Paragraph size="lg" className="text-text-secondary">
                {petData.description}
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
                  <dd>{petData.rarity && <RarityBadge rarity={petData.rarity} size="sm" />}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Type</dt>
                  <dd className="text-sm text-text-primary">{petData.type}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Attack</dt>
                  <dd className="text-sm text-text-primary">{petData.stats.attack}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Defense</dt>
                  <dd className="text-sm text-text-primary">{petData.stats.defense}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Speed</dt>
                  <dd className="text-sm text-text-primary">{petData.stats.speed}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Sell Price</dt>
                  <dd className="text-sm text-text-primary">{petData.sellPrice.toLocaleString()} Gems</dd>
                </div>
              </dl>
            </div>

            {/* How to Get Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                How to Get
              </Heading>
              <Paragraph className="text-text-primary">{petData.howToGet}</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
