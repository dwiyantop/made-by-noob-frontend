import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { Paragraph } from "@/components/ui/paragraph";
import { RarityBadge } from "@/app/grow-a-garden/_components/rarity-badge";
import { cn } from "@/lib/utils";
import type { WikiPetItem } from "@/app/grow-a-garden/wiki/pets/_lib/transformers";

/**
 * Constants for pet card styling and behavior
 */
const CARD_CONSTANTS = {
  IMAGE_SCALE: 0.75,
  IMAGE_QUALITY: 85,
  MOBILE_PASSIVE_STATES_MAX: 1,
  DESKTOP_PASSIVE_STATES_MAX: 3,
} as const;

interface PetCardProps {
  pet: WikiPetItem;
  className?: string;
}

/**
 * Pet card component displaying pet information with image, rarity, and passive states.
 * Memoized to prevent unnecessary re-renders.
 */
export const PetCard = memo(function PetCard({ pet, className }: PetCardProps) {
  const hasImage = Boolean(pet.imageUrl);

  const imageStyle = useMemo(
    () => ({
      width: `${CARD_CONSTANTS.IMAGE_SCALE * 100}%`,
      height: `${CARD_CONSTANTS.IMAGE_SCALE * 100}%`,
    }),
    []
  );

  const passiveStatesDisplay = useMemo(() => {
    if (!pet.passiveStates || pet.passiveStates.length === 0) {
      return null;
    }

    const mobileDisplay =
      pet.passiveStates[0] +
      (pet.passiveStates.length > CARD_CONSTANTS.MOBILE_PASSIVE_STATES_MAX
        ? ` & ${
            pet.passiveStates.length - CARD_CONSTANTS.MOBILE_PASSIVE_STATES_MAX
          } more`
        : "");

    const desktopDisplay =
      pet.passiveStates
        .slice(0, CARD_CONSTANTS.DESKTOP_PASSIVE_STATES_MAX)
        .join(", ") +
      (pet.passiveStates.length > CARD_CONSTANTS.DESKTOP_PASSIVE_STATES_MAX
        ? ` & ${
            pet.passiveStates.length - CARD_CONSTANTS.DESKTOP_PASSIVE_STATES_MAX
          } more`
        : "");

    return { mobileDisplay, desktopDisplay };
  }, [pet.passiveStates]);

  return (
    <Link
      href={pet.href}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative transition-all duration-300 ease-out"
            style={imageStyle}
          >
            {hasImage ? (
              <Image
                src={pet.imageUrl}
                alt={pet.name}
                fill
                sizes="(min-width: 1024px) 25%, (min-width: 640px) 33.33%, 50%"
                className="object-contain transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
                loading="lazy"
                quality={CARD_CONSTANTS.IMAGE_QUALITY}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-card/90">
                <Image
                  src="/favicon.svg"
                  alt={pet.name}
                  width={64}
                  height={64}
                  className="opacity-80"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
          {pet.rarity && (
            <RarityBadge
              rarity={pet.rarity}
              size="sm"
              className="relative z-10"
            />
          )}
        </div>
      </div>
      <div className="relative space-y-1 bg-card/40 p-3 backdrop-blur-sm">
        <Paragraph
          size="sm"
          className="font-semibold text-text-primary line-clamp-1"
        >
          {pet.name}
        </Paragraph>
        {passiveStatesDisplay && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className="i-lucide-sparkles h-3.5 w-3.5 shrink-0"
              aria-hidden
            />
            <span className="line-clamp-1 truncate md:hidden">
              {passiveStatesDisplay.mobileDisplay}
            </span>
            <span className="hidden line-clamp-1 truncate md:inline">
              {passiveStatesDisplay.desktopDisplay}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
});

interface PetCardSkeletonProps {
  className?: string;
}

export const PetCardSkeleton = memo(function PetCardSkeleton({
  className,
}: PetCardSkeletonProps) {
  const imageStyle = useMemo(
    () => ({
      width: `${CARD_CONSTANTS.IMAGE_SCALE * 100}%`,
      height: `${CARD_CONSTANTS.IMAGE_SCALE * 100}%`,
    }),
    []
  );

  return (
    <div
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative transition-all duration-300 ease-out"
            style={imageStyle}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/favicon.svg"
                alt=""
                width={64}
                height={64}
                className="opacity-30"
                loading="lazy"
                aria-hidden
              />
            </div>
          </div>
        </div>
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
          <div className="relative z-10 h-5 w-16 animate-pulse rounded-full bg-card/30" />
        </div>
      </div>
      <div className="relative space-y-1 bg-card/40 p-3 backdrop-blur-sm">
        <Paragraph
          size="sm"
          className="font-semibold text-text-primary line-clamp-1 relative"
        >
          <span className="invisible">Pet Name Placeholder</span>
          <span className="absolute inset-0 block h-full w-24 animate-pulse rounded bg-card/30" />
        </Paragraph>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-text-secondary">
          <span
            className="i-lucide-sparkles h-3.5 w-3.5 shrink-0 opacity-30"
            aria-hidden
          />
          <span className="line-clamp-1 truncate md:hidden relative">
            <span className="invisible">Passive State Placeholder</span>
            <span className="absolute inset-0 block h-full w-20 animate-pulse rounded bg-card/30" />
          </span>
          <span className="hidden line-clamp-1 truncate md:inline relative">
            <span className="invisible">Passive State Placeholder</span>
            <span className="absolute inset-0 block h-full w-20 animate-pulse rounded bg-card/30" />
          </span>
        </div>
      </div>
    </div>
  );
});
