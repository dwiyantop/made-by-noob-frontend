import type { Metadata } from 'next';

import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { ImageLoader } from '@/components/ui/image-loader';
import { Paragraph } from '@/components/ui/paragraph';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { RarityBadge } from '@/app/grow-a-garden/_components/rarity-badge';

interface EggDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getEggData(slug: string) {
  // Extract item number from slug if exists (e.g., "eggs-item-1" -> 1)
  const match = slug.match(/-item-(\d+)$/);
  const itemIndex = match ? parseInt(match[1], 10) - 1 : 0;

  // Get rarity based on item index
  const rarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const rarity = rarities[itemIndex % rarities.length];

  // Generate meaningful item name
  const itemName = `${rarity} Egg`;

  // Get hatch time
  const hatchTimes = ['5 minutes', '10 minutes', '15 minutes', '30 minutes', '1 hour', '2 hours', '4 hours', '8 hours'];
  const hatchTime = hatchTimes[itemIndex % hatchTimes.length];

  // Get pet count
  const petCounts = [1, 2, 3, 4, 5];
  const petCount = petCounts[itemIndex % petCounts.length];

  // Get egg count
  const eggCounts = [0, 1, 2, 3];
  const eggCount = eggCounts[itemIndex % eggCounts.length];

  // Get image
  const imageUrl = `https://picsum.photos/800/800?random=egg-${itemIndex}`;

  // Get description
  const description = `A ${rarity.toLowerCase()} egg that can be hatched to obtain pets and eggs. This egg contains unique properties and requires specific conditions to hatch successfully. The hatch time is ${hatchTime} and it contains ${petCount} ${
    petCount === 1 ? 'pet' : 'pets'
  }${eggCount > 0 ? ` and ${eggCount} ${eggCount === 1 ? 'egg' : 'eggs'}` : ''}.`;

  // Generate possible pet rewards with percentage
  // Always generate multiple pet rewards (at least 5-8 pets)
  const possiblePetRarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const petPercentages = [45, 25, 15, 8, 4, 2, 0.8, 0.2]; // Percentage based on rarity
  const minPetRewards = 5;
  const maxPetRewards = 8;
  const petRewardCount = minPetRewards + (itemIndex % (maxPetRewards - minPetRewards + 1));
  const petRewards = Array.from({ length: petRewardCount }, (_, i) => {
    const rarityIndex = (itemIndex + i) % possiblePetRarities.length;
    const rewardRarity = possiblePetRarities[rarityIndex];
    const percentage = petPercentages[rarityIndex];
    const rewardIndex = itemIndex + i + 1;
    return {
      name: `${rewardRarity} Pet`,
      rarity: rewardRarity,
      imageUrl: `https://picsum.photos/200/200?random=pet-reward-${itemIndex}-${i}`,
      percentage,
      type: 'pet' as const,
      href: `/grow-a-garden/wiki/pets/pets-item-${rewardIndex}`,
    };
  });

  // Generate possible egg rewards with percentage
  // Always generate multiple egg rewards (at least 2-4 eggs)
  const possibleEggRarities: Array<
    'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythical' | 'Divine' | 'Prismatic' | 'Transcendent'
  > = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic', 'Transcendent'];
  const eggPercentages = [50, 30, 12, 5, 2, 0.8, 0.15, 0.05]; // Percentage based on rarity
  const minEggRewards = 2;
  const maxEggRewards = 4;
  const eggRewardCount = minEggRewards + (itemIndex % (maxEggRewards - minEggRewards + 1));
  const eggRewards = Array.from({ length: eggRewardCount }, (_, i) => {
    const rarityIndex = (itemIndex + i + petRewardCount) % possibleEggRarities.length;
    const rewardRarity = possibleEggRarities[rarityIndex];
    const percentage = eggPercentages[rarityIndex];
    const rewardIndex = itemIndex + i + petRewardCount + 1;
    return {
      name: `${rewardRarity} Egg`,
      rarity: rewardRarity,
      imageUrl: `https://picsum.photos/200/200?random=egg-reward-${itemIndex}-${i}`,
      percentage,
      type: 'egg' as const,
      href: `/grow-a-garden/wiki/eggs/eggs-item-${rewardIndex}`,
    };
  });

  return {
    name: itemName,
    description,
    rarity,
    imageUrl,
    hatchTime,
    petCount,
    eggCount,
    petRewards,
    eggRewards,
  };
}

export async function generateStaticParams() {
  const params: Array<{ slug: string }> = [];

  // Generate a few example eggs for SSG
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: `eggs-item-${i}`,
    });
  }

  return params;
}

export async function generateMetadata({ params }: EggDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const eggData = getEggData(slug);

  return {
    title: `${eggData.name} - Grow a Garden Eggs | MadeByNoob`,
    description: `${eggData.description} Find complete stats, rarity, hatch time, and how to obtain this egg.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${eggData.name.toLowerCase()}`,
      `grow a garden eggs ${eggData.name.toLowerCase()}`,
      `roblox grow a garden ${eggData.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${eggData.name} - Grow a Garden Eggs | MadeByNoob`,
      description: eggData.description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://madebynoob.com'}/grow-a-garden/wiki/eggs/${slug}`,
    },
  };
}

export default async function EggDetailPage({ params }: EggDetailPageProps) {
  const { slug } = await params;
  const eggData = getEggData(slug);

  const breadcrumbItems = [
    { label: 'Wiki', href: '/grow-a-garden' },
    { label: 'Eggs', href: '/grow-a-garden/wiki/eggs' },
    { label: eggData.name },
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
                src={eggData.imageUrl}
                alt={eggData.name}
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
              <Heading variant="h1">{eggData.name}</Heading>
              <Paragraph size="lg" className="text-text-secondary">
                {eggData.description}
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
                  <dd>{eggData.rarity && <RarityBadge rarity={eggData.rarity} size="sm" />}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Hatch Time</dt>
                  <dd className="text-sm text-text-primary">{eggData.hatchTime}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Pet Count</dt>
                  <dd className="text-sm text-text-primary">
                    {eggData.petCount} {eggData.petCount === 1 ? 'pet' : 'pets'}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-sm font-semibold text-text-secondary">Egg Count</dt>
                  <dd className="text-sm text-text-primary">
                    {eggData.eggCount} {eggData.eggCount === 1 ? 'egg' : 'eggs'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Possible Rewards Section */}
        {(eggData.petRewards.length > 0 || eggData.eggRewards.length > 0) && (
          <div className="space-y-6">
            <Heading variant="h2" className="text-2xl">
              Possible Rewards
            </Heading>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...eggData.petRewards, ...eggData.eggRewards].map((reward, index) => (
                <Link
                  key={index}
                  href={reward.href}
                  className="group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <ImageLoader
                      src={reward.imageUrl}
                      alt={reward.name}
                      fill
                      sizes="(min-width: 1024px) 20%, (min-width: 768px) 25%, (min-width: 640px) 33.33%, 50%"
                      className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                      fallbackClassName="bg-card/90"
                    />
                    {reward.rarity && (
                      <div className="absolute right-2 top-2 z-10">
                        <RarityBadge rarity={reward.rarity} size="sm" className="relative z-10" />
                      </div>
                    )}
                  </div>
                  <div className="relative bg-card/40 p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-2">
                      <Paragraph size="sm" className="font-semibold text-text-primary line-clamp-1 flex-1">
                        {reward.name}
                      </Paragraph>
                      <Badge variant="soft" color="primary" size="md" className="shrink-0">
                        {reward.percentage < 1 ? reward.percentage.toFixed(2) : reward.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
