import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ImageLoader } from "@/components/ui/image-loader";
import { Paragraph } from "@/components/ui/paragraph";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RarityBadge } from "@/app/grow-a-garden/_components/rarity-badge";
import { fetchEggBySlug } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-data";
import type { PetEgg } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { formatHatchTime } from "@/helpers/format-hatch-time";
import { generateEggDescription } from "./_helpers/generate-egg-description";

interface EggDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Fetches egg data by slug.
 * Returns null if egg not found.
 */
async function getEggData(slug: string): Promise<PetEgg | null> {
  try {
    const response = await fetchEggBySlug(slug);

    if (response && "data" in response && response.data) {
      return response.data as PetEgg;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch egg:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: EggDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const egg = await getEggData(slug);

  if (!egg) {
    return {
      title: "Egg Not Found - Grow a Garden Eggs",
    };
  }

  const eggName = egg.name;
  const description =
    egg.description ||
    generateEggDescription(egg) ||
    `Complete information about ${eggName} in Grow a Garden. Find stats, rarity, hatch time, and rewards.`;

  return {
    title: `${eggName} - Grow a Garden Eggs`,
    description: `${description} Find complete stats, rarity, hatch time, and rewards.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${eggName.toLowerCase()}`,
      `grow a garden eggs ${eggName.toLowerCase()}`,
      `roblox grow a garden ${eggName.toLowerCase()}`,
    ],
    openGraph: {
      title: `${eggName} - Grow a Garden Eggs`,
      description,
      type: "website",
      url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://madebynoob.com"
      }/grow-a-garden/wiki/eggs/${slug}`,
    },
  };
}

export default async function EggDetailPage({ params }: EggDetailPageProps) {
  const { slug } = await params;
  const egg = await getEggData(slug);

  if (!egg) {
    notFound();
  }

  const rarityName = egg.rarity?.name;
  const imageUrl = egg.icon || "";
  const hatchTimeFormatted = formatHatchTime(egg.hatchTime);

  // Generate description if missing
  const description = egg.description || generateEggDescription(egg);

  // Calculate pet and egg counts
  const petItems = egg.items?.filter((item) => item.itemType === "pet") ?? [];
  const eggItems = egg.items?.filter((item) => item.itemType === "egg") ?? [];
  const petCount = petItems.length;
  const eggCount = eggItems.length;

  // Calculate total odds for percentage calculation
  const allItems = egg.items ?? [];
  const totalOdds = allItems.reduce((sum, item) => {
    return sum + (item.normalizeOdds ?? 0);
  }, 0);

  const breadcrumbItems = [
    { label: "Eggs", href: "/grow-a-garden/wiki/eggs" },
    { label: egg.name },
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
                src={imageUrl}
                alt={egg.name}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-contain"
                fallbackClassName="bg-card/90"
              />
            </div>
          </div>

          {/* Right Column - Data */}
          <div className="md:col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heading variant="h1" className="text-2xl md:text-4xl">
                  {egg.name}
                </Heading>
                {rarityName && <RarityBadge rarity={rarityName} size="md" />}
              </div>
              {description && (
                <Paragraph size="lg" className="text-text-secondary">
                  {description}
                </Paragraph>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                Details
              </Heading>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {hatchTimeFormatted && (
                  <div className="flex gap-3">
                    <div className="flex items-center">
                      <span
                        className="i-lucide-clock h-4 w-4 shrink-0 text-text-secondary"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="text-sm font-semibold text-text-secondary">
                        Hatch Time
                      </div>
                      <div className="text-sm text-text-primary">
                        {hatchTimeFormatted}
                      </div>
                    </div>
                  </div>
                )}
                {petCount > 0 && (
                  <div className="flex gap-3">
                    <div className="flex items-center">
                      <span
                        className="i-lucide-paw-print h-4 w-4 shrink-0 text-text-secondary"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="text-sm font-semibold text-text-secondary">
                        Pet Count
                      </div>
                      <div className="text-sm text-text-primary">
                        {petCount} {petCount === 1 ? "pet" : "pets"}
                      </div>
                    </div>
                  </div>
                )}
                {eggCount > 0 && (
                  <div className="flex gap-3">
                    <div className="flex items-center">
                      <span
                        className="i-lucide-egg h-4 w-4 shrink-0 text-text-secondary"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="text-sm font-semibold text-text-secondary">
                        Egg Count
                      </div>
                      <div className="text-sm text-text-primary">
                        {eggCount} {eggCount === 1 ? "egg" : "eggs"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Possible Rewards Section - Full Width */}
        {allItems.length > 0 && (
          <div className="space-y-4">
            <Heading variant="h2" className="text-xl">
              Possible Rewards
            </Heading>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {allItems.map((item) => {
                const percentage =
                  totalOdds > 0 && item.normalizeOdds
                    ? (item.normalizeOdds / totalOdds) * 100
                    : 0;
                const itemName = item.name;
                const itemRarity =
                  item.pet?.rarity?.name || item.egg?.rarity?.name;
                const itemImageUrl = item.pet?.icon || item.egg?.icon || "";
                const itemSlug = item.pet?.slug || item.egg?.slug;
                const itemHref = itemSlug
                  ? item.itemType === "pet"
                    ? `/grow-a-garden/wiki/pets/${itemSlug}`
                    : `/grow-a-garden/wiki/eggs/${itemSlug}`
                  : null;

                const cardContent = (
                  <>
                    <div className="relative aspect-square w-full overflow-hidden">
                      <ImageLoader
                        src={itemImageUrl}
                        alt={itemName}
                        fill
                        sizes="(min-width: 1024px) 20%, (min-width: 768px) 25%, (min-width: 640px) 33.33%, 50%"
                        className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                        fallbackClassName="bg-card/90"
                      />
                      {itemRarity && (
                        <div className="absolute right-2 top-2 z-10">
                          <RarityBadge
                            rarity={itemRarity}
                            size="sm"
                            className="relative z-10"
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative bg-card/40 p-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between gap-2">
                        <Paragraph
                          size="sm"
                          className="font-semibold text-text-primary line-clamp-1 flex-1"
                        >
                          {itemName}
                        </Paragraph>
                        {percentage > 0 && (
                          <span className="inline-flex items-center rounded-full bg-accent-primary/10 px-2 py-0.5 text-xs font-medium text-accent-primary shrink-0">
                            {percentage < 1
                              ? percentage.toFixed(2)
                              : percentage.toFixed(1)}
                            %
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                );

                if (itemHref) {
                  return (
                    <Link
                      key={item.id}
                      href={itemHref}
                      className="group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40"
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20"
                  >
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
