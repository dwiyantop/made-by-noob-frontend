import type { PetEgg } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { formatHatchTime } from "@/helpers/format-hatch-time";

/**
 * Generates a description for an egg based on its properties.
 * Used when the egg doesn't have a description field.
 */
export function generateEggDescription(egg: PetEgg): string {
  const rarityName = egg.rarity?.name?.toLowerCase() || "unknown";
  const hatchTime = formatHatchTime(egg.hatchTime);

  const petItems = egg.items?.filter((item) => item.itemType === "pet") ?? [];
  const eggItems = egg.items?.filter((item) => item.itemType === "egg") ?? [];

  const petCount = petItems.length;
  const eggCount = eggItems.length;

  const parts: string[] = [];

  parts.push(`A ${rarityName} egg that can be hatched to obtain rewards.`);

  if (hatchTime) {
    parts.push(`The hatch time is ${hatchTime}.`);
  }

  if (petCount > 0 || eggCount > 0) {
    const rewardParts: string[] = [];

    if (petCount > 0) {
      rewardParts.push(`${petCount} ${petCount === 1 ? "pet" : "pets"}`);
    }

    if (eggCount > 0) {
      rewardParts.push(`${eggCount} ${eggCount === 1 ? "egg" : "eggs"}`);
    }

    if (rewardParts.length > 0) {
      parts.push(`This egg contains ${rewardParts.join(" and ")}.`);
    }
  }

  return parts.join(" ");
}
