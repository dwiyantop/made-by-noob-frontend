import type { Pet } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";

/**
 * Transformed pet item for wiki display.
 */
export interface WikiPetItem {
  id: number;
  name: string;
  imageUrl: string;
  rarity?: string;
  passiveStates?: string[];
  href: string;
}

/**
 * Extracts unique passive state keys from pet passives.
 * Optimized to avoid unnecessary iterations.
 */
function extractPassiveStateKeys(pet: Pet): string[] | undefined {
  if (!pet.passives?.length) {
    return undefined;
  }

  const stateKeys = new Set<string>();

  for (const passive of pet.passives) {
    if (passive.states?.length) {
      for (const state of passive.states) {
        if (state.stateKey) {
          stateKeys.add(state.stateKey);
        }
      }
    }
  }

  return stateKeys.size > 0 ? Array.from(stateKeys) : undefined;
}

/**
 * Builds a pet href from slug or key.
 */
function buildPetHref(pet: Pet): string {
  return `/grow-a-garden/wiki/pets/${pet.slug || pet.key}`;
}

/**
 * Transforms Pet entities into WikiPetItem format for display.
 * Optimized for performance with early returns and efficient array operations.
 *
 * @param pets - Array of Pet entities to transform
 * @returns Array of transformed WikiPetItem objects
 */
export function buildPetList(pets: Pet[] = []): WikiPetItem[] {
  if (pets.length === 0) {
    return [];
  }

  return pets.map((pet, index) => ({
    id: index + 1,
    name: pet.name,
    imageUrl: pet.icon || "",
    rarity: pet.rarity?.name,
    passiveStates: extractPassiveStateKeys(pet),
    href: buildPetHref(pet),
  }));
}
