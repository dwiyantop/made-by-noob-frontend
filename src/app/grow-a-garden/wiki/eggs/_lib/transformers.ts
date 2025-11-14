import type {
  PetEgg,
  PetEggItemType,
} from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";

export interface WikiEggItem {
  id: number;
  name: string;
  imageUrl: string;
  rarity?: string;
  info?: string;
  hatchTime?: string;
  petCount?: number;
  href: string;
}

export function formatHatchTime(hatchTime?: number | null) {
  if (
    typeof hatchTime !== "number" ||
    Number.isNaN(hatchTime) ||
    hatchTime <= 0
  ) {
    return undefined;
  }

  if (hatchTime < 60) {
    return `${Math.round(hatchTime)} sec`;
  }

  const totalMinutes = Math.round(hatchTime / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
}

function toTitleCase(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function deriveTypeLabel(egg: PetEgg) {
  const rewardTypes = new Set(
    (egg.items ?? [])
      .map((item) => item.itemType)
      .filter((type): type is PetEggItemType => Boolean(type))
  );

  if (rewardTypes.size === 0) {
    return undefined;
  }

  if (rewardTypes.size === 1) {
    const [single] = Array.from(rewardTypes);
    return toTitleCase(single);
  }

  return "Pet & Egg";
}

export function buildEggList(petEggs: PetEgg[] = []): WikiEggItem[] {
  return petEggs.map((egg, index) => {
    const typeLabel = deriveTypeLabel(egg);
    const petRewardsCount = (egg.items ?? []).filter(
      (item) => item.itemType === "pet"
    ).length;

    return {
      id: index + 1,
      name: egg.name,
      imageUrl: egg.icon || "",
      rarity: egg.rarity?.name,
      info: typeLabel,
      hatchTime: formatHatchTime(egg.hatchTime),
      petCount: petRewardsCount > 0 ? petRewardsCount : undefined,
      href: `/grow-a-garden/wiki/eggs/${egg.slug || egg.key}`,
    };
  });
}
