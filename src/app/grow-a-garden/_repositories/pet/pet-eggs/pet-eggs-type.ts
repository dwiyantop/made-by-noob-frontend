import { Pet } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import { Rarity } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import { z } from "zod";
import { parseAsString, parseAsInteger, parseAsStringEnum } from "nuqs/server";

export interface PetEgg {
  /**
   * Unique identifier for the pet egg record in the database.
   * This is typically an auto-generated UUID or database ID.
   */
  id: string;

  /**
   * Unique identifier for the egg obtained from the Grow a Garden datahub.
   * This key is used to reference the egg in the game's data system.
   * Must be unique across all pet eggs.
   */
  key: string;

  /**
   * URL-friendly slug generated from the key.
   * Used for SEO-friendly URLs and API endpoints.
   * Auto-generated from the key value.
   */
  slug: string;

  /**
   * Display name of the pet egg.
   * This is the human-readable name shown to users in the game.
   */
  name: string;

  /**
   * Optional description of the pet egg.
   * Currently not available from the datahub source, defaults to null.
   */
  description?: string | null;

  /**
   * The time it takes for the egg to hatch in seconds.
   * This is used to determine how long the pet will be in the game before it can be sold.
   */
  hatchTime: number;

  /**
   * Icon/Image URL of the pet egg.
   * This is the icon shown to users in the game. Can be a Roblox asset ID (rbxassetid://) or external URL.
   */
  icon: string;

  /**
   * Rarity ID of the pet egg.
   * Foreign key reference to the global rarity this pet egg belongs to.
   * Nullable as eggs may not always have an associated rarity.
   */
  rarityId?: string | null;

  /**
   * Rarity of the pet egg.
   * This is the rarity entity relation, populated when loading relations.
   */
  rarity?: Rarity | null;

  /**
   * Reward items contained within this egg. Populated when relations are loaded.
   */
  items?: PetEggItem[];

  /**
   * Timestamp indicating when the pet egg record was created in the database.
   */
  createdAt: Date;

  /**
   * Timestamp indicating when the pet egg record was last updated in the database.
   */
  updatedAt: Date;

  /**
   * Timestamp indicating when this pet egg data was last synced from the datahub.
   * Updated automatically during sync operations.
   * Null if the record has never been synced.
   */
  lastSyncedAt: Date | null;

  /**
   * Timestamp indicating when the pet egg record was deleted in the database.
   * Null if the record has not been deleted.
   */
  deletedAt?: Date | null;
}

export enum PetEggItemType {
  Pet = "pet",
  Egg = "egg",
}

export interface PetEggItemBase {
  /**
   * Unique identifier for the pet egg item record in the database.
   * This is typically an auto-generated UUID or database ID.
   */
  id: string;

  /**
   * Unique identifier for the item obtained from the Grow a Garden datahub.
   */
  key: string;

  /**
   * Display name of the pet egg item.
   * This is the human-readable name shown to users in the game.
   */
  name: string;

  /**
   * Type discriminator indicating whether this item unlocks a pet or another egg.
   */
  itemType: PetEggItemType;

  /**
   * Pet egg ID of the pet egg item.
   * Foreign key reference to the pet egg this pet egg item belongs to.
   */
  petEggId: string;

  /**
   * Optional relation loaded when the parent egg is eagerly fetched.
   */
  petEgg?: PetEgg;

  /** Minimum weight for randomly generated pet data (Datahub field). */
  generatedPetDataWeightRangeMin: number | null;

  /**
   * Maximum weight for randomly generated pet data (Datahub field).
   */
  generatedPetDataWeightRangeMax: number | null;

  /**
   * Chance (0-1) for the generated pet to be huge.
   */
  generatedPetDataHugeChance: number | null;

  /**
   * Normalized odds value supplied by Datahub (already normalized across siblings).
   */
  normalizeOdds: number | null;

  /**
   * Raw odds weight supplied by Datahub.
   */
  itemOdds: number | null;

  /**
   * Timestamp indicating when the pet egg record was created in the database.
   */
  createdAt: Date;

  /**
   * Timestamp indicating when the pet egg record was last updated in the database.
   */
  updatedAt: Date;

  /**
   * Timestamp indicating when this pet egg data was last synced from the datahub.
   * Updated automatically during sync operations.
   * Null if the record has never been synced.
   */
  lastSyncedAt: Date | null;

  /**
   * Timestamp indicating when the pet egg record was deleted in the database.
   * Null if the record has not been deleted.
   */
  deletedAt?: Date | null;
}

export interface PetEggItem extends PetEggItemBase {
  /** When itemType is Pet, references the rewarded pet; otherwise null. */
  petId: string | null;

  /** Optional relation loaded when the pet is eagerly fetched. */
  pet?: Pet | null;

  /** When itemType is Egg, references the nested egg; otherwise null. */
  eggId: string | null;

  /** Optional relation loaded when the nested egg is eagerly fetched. */
  egg?: PetEgg | null;
}

export interface PetEggSyncFailureDetail {
  /** Key of the egg being processed when the failure occurred. */
  eggKey: string;

  /** Key of the reward item that failed to process, when available. */
  itemKey?: string;

  /** Item type (pet or egg) for additional context. */
  itemType?: PetEggItemType;

  /** Referenced pet or egg key that caused the failure, if relevant. */
  referenceKey?: string;

  /** Human-readable explanation of the failure. */
  message: string;
}

export interface PetEggSyncSummary {
  /** Total number of eggs evaluated from the datahub payload. */
  totalEggs: number;

  /** Number of eggs successfully created or updated. */
  syncedEggs: number;

  /** Total number of reward items evaluated across all eggs. */
  totalItems: number;

  /** Number of reward items successfully created or updated. */
  syncedItems: number;

  /** Number of reward items that failed to process. */
  failedItems: number;

  /** Detailed breakdown of each failure encountered during sync. */
  failures: PetEggSyncFailureDetail[];
}

export const petEggSortFields = [
  "key",
  "name",
  "hatchTime",
  "itemType",
  "rarityLevel",
  "createdAt",
  "updatedAt",
  "lastSyncedAt",
] as const;

export const petEggOrderFields = ["asc", "desc"] as const;

export const findAllPetEggsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  key: z.string().optional(),
  name: z.string().optional(),
  rarityKeys: z.string().optional(),
  itemTypes: z.string().optional(),
  sort: z.enum(petEggSortFields).default("rarityLevel"),
  order: z.enum(petEggOrderFields).default("asc"),
});

export type FindAllPetEggsQuery = z.infer<typeof findAllPetEggsQuerySchema>;

/**
 * nuqs parser descriptor for pet eggs search params.
 *
 * Mirrors {@link findAllPetEggsQuerySchema} exactly, meaning:
 * - Field names, types, and defaults must stay in sync with the Zod schema.
 * - Used by both server-side loaders (createLoader) and client-side useQueryStates.
 * - Any schema change must be reflected here to avoid URL/query mismatches.
 */
export const petEggsSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(50),
  key: parseAsString,
  name: parseAsString.withDefault(""),
  rarityKeys: parseAsString,
  itemTypes: parseAsString,
  sort: parseAsStringEnum([...petEggSortFields]).withDefault("rarityLevel"),
  order: parseAsStringEnum([...petEggOrderFields]).withDefault("asc"),
} as const;
