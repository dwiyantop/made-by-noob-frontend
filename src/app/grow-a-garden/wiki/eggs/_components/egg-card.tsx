"use client";

import { useState } from "react";
import Link from "next/link";

import { ImageLoader } from "@/components/ui/image-loader";
import { Paragraph } from "@/components/ui/paragraph";
import { RarityBadge } from "@/app/grow-a-garden/_components/rarity-badge";
import { cn } from "@/lib/utils";
import type { WikiEggItem } from "@/app/grow-a-garden/wiki/eggs/_lib/transformers";

interface EggCardProps {
  egg: WikiEggItem;
  className?: string;
}

export function EggCard({ egg, className }: EggCardProps) {
  const [imageError, setImageError] = useState(!egg.imageUrl);

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Start with scale 0.75, only use full scale (1) if image errors
  const imageScale = 0.75;
  const effectiveScale = imageError ? 1 : imageScale;

  return (
    <Link
      href={egg.href}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border/20 bg-card/40 shadow-lg shadow-black/20 transition-all duration-300 hover:border-border/40",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              width: `${effectiveScale * 100}%`,
              height: `${effectiveScale * 100}%`,
            }}
          >
            <ImageLoader
              key={egg.imageUrl}
              src={egg.imageUrl || "/favicon.svg"}
              alt={egg.name}
              fill
              sizes="(min-width: 1024px) 25%, (min-width: 640px) 33.33%, 50%"
              className="object-contain transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
              fallbackClassName="bg-card/90"
              forceError={!egg.imageUrl}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        </div>
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
          {egg.rarity && (
            <RarityBadge
              rarity={egg.rarity}
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
          {egg.name}
        </Paragraph>
        {(egg.hatchTime || egg.petCount !== undefined) && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-text-secondary">
            {egg.hatchTime && (
              <div className="flex items-center gap-1.5">
                <span
                  className="i-lucide-clock h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span className="line-clamp-1">Hatches in {egg.hatchTime}</span>
              </div>
            )}
            {egg.petCount !== undefined && (
              <div className="flex items-center gap-1.5">
                <span
                  className="i-lucide-dog h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span className="line-clamp-1">
                  Has {egg.petCount} {egg.petCount === 1 ? "pet" : "pets"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
