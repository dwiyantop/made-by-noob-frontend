import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { ImageLoader } from "@/components/ui/image-loader";
import { Paragraph } from "@/components/ui/paragraph";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RarityBadge } from "@/app/grow-a-garden/_components/rarity-badge";
import { fetchPetBySlug } from "@/app/grow-a-garden/_repositories/pet/pets/pets-data";
import type { Pet } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import { formatNumber } from "@/helpers/format-number";
import { PassiveAbilityItem } from "./_components/passive-ability-item";

interface PetDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Fetches pet data by slug.
 * Returns null if pet not found.
 */
async function getPetData(slug: string): Promise<Pet | null> {
  try {
    const response = await fetchPetBySlug(slug);

    if (response && "data" in response && response.data) {
      return response.data as Pet;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch pet:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PetDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pet = await getPetData(slug);

  if (!pet) {
    return {
      title: "Pet Not Found - Grow a Garden Pets",
    };
  }

  const petName = pet.name;
  const description =
    pet.description ||
    `Complete information about ${petName} in Grow a Garden. Find stats, rarity, abilities, and how to obtain this pet.`;

  return {
    title: `${petName} - Grow a Garden Pets`,
    description: `${description} Find complete stats, rarity, abilities, and how to obtain this pet.`,
    keywords: [
      `grow a garden ${slug}`,
      `grow a garden ${petName.toLowerCase()}`,
      `grow a garden pets ${petName.toLowerCase()}`,
      `roblox grow a garden ${petName.toLowerCase()}`,
    ],
    openGraph: {
      title: `${petName} - Grow a Garden Pets`,
      description,
      type: "website",
      url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://madebynoob.com"
      }/grow-a-garden/wiki/pets/${slug}`,
    },
  };
}

export default async function PetDetailPage({ params }: PetDetailPageProps) {
  const { slug } = await params;
  const pet = await getPetData(slug);

  if (!pet) {
    notFound();
  }

  const rarityName = pet.rarity?.name;
  const imageUrl = pet.icon || "";
  const sellPrice = pet.sellPrice || 0;

  // Extract passive state keys for display (deduplicated)
  const passiveStates = pet.passives
    ?.flatMap((passive) => passive.states ?? [])
    .map((state) => state.stateKey)
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index) as
    | string[]
    | undefined;

  const breadcrumbItems = [
    { label: "Pets", href: "/grow-a-garden/wiki/pets" },
    { label: pet.name },
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
                alt={pet.name}
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
                  {pet.name}
                </Heading>
                {rarityName && <RarityBadge rarity={rarityName} size="md" />}
              </div>
              {pet.description && (
                <Paragraph size="lg" className="text-text-secondary">
                  {pet.description}
                </Paragraph>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                Details
              </Heading>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pet.defaultHunger !== undefined &&
                  pet.defaultHunger !== null && (
                    <div className="flex gap-3">
                      <div className="flex items-center">
                        <span
                          className="i-lucide-apple h-4 w-4 shrink-0 text-text-secondary"
                          aria-hidden
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1">
                        <div className="text-sm font-semibold text-text-secondary">
                          Hunger
                        </div>
                        <div className="text-sm text-text-primary">
                          {formatNumber(pet.defaultHunger)}
                        </div>
                      </div>
                    </div>
                  )}
                {sellPrice > 0 && (
                  <div className="flex gap-3">
                    <div className="flex items-center">
                      <span
                        className="i-lucide-coins h-4 w-4 shrink-0 text-text-secondary"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <div className="text-sm font-semibold text-text-secondary">
                        Estimated Sell Price
                      </div>
                      <div className="text-sm text-text-primary">
                        ¢{formatNumber(sellPrice)} Sheckles
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* How to Obtain Section */}
            <div className="space-y-4">
              <Heading variant="h2" className="text-xl">
                How to Obtain
              </Heading>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <span
                      className="i-lucide-egg h-4 w-4 shrink-0 text-text-secondary"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <div className="text-sm font-semibold text-text-secondary">
                      Egg
                    </div>
                    <div className="text-sm text-text-primary flex items-center gap-1 cursor-pointer hover:text-accent-primary transition-colors group">
                      Common Egg
                      <span
                        className="i-lucide-external-link h-3 w-3 shrink-0 text-text-secondary group-hover:text-accent-primary transition-colors"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <span
                      className="i-lucide-percent h-4 w-4 shrink-0 text-text-secondary"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <div className="text-sm font-semibold text-text-secondary">
                      Chance
                    </div>
                    <div className="text-sm text-text-primary">25%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passive Keys Section - Full Width */}
        {passiveStates && passiveStates.length > 0 && (
          <div className="space-y-4">
            <Heading variant="h2" className="text-xl">
              Passive Keys
            </Heading>
            <div className="flex flex-wrap gap-2">
              {passiveStates.map((state) => (
                <span
                  key={state}
                  className="inline-flex items-center rounded-full bg-accent-primary/10 px-3 py-1 text-xs font-medium text-accent-primary"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Passive Ability Section - Full Width */}
        {pet.passives && pet.passives.length > 0 && (
          <div className="space-y-4">
            <Heading variant="h2" className="text-xl">
              Passive Ability
            </Heading>
            <div className="space-y-4">
              {pet.passives.map((passive) => (
                <PassiveAbilityItem key={passive.id} passive={passive} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
