import type { PetPassive } from "@/app/grow-a-garden/_repositories/pet/pet-passives/pet-passives-type";
import type { Rarity } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import { z } from "zod";
import { parseAsString, parseAsInteger, parseAsStringEnum } from "nuqs/server";

export enum MovementType {
  Grounded = "Grounded",
  Flight = "Flight",
}

export interface Pet {
  /**
   * Unique identifier for the pet record in the database.
   * This is typically an auto-generated UUID or database ID.
   */
  id: string;

  /**
   * Unique identifier for the pet obtained from the Grow a Garden datahub.
   * This key is used to reference the pet in the game's data system.
   * Must be unique across all pets.
   */
  key: string;

  /**
   * URL-friendly slug generated from the key.
   * Used for SEO-friendly URLs and API endpoints. Auto-generated from the key value.
   */
  slug: string;

  /**
   * Display name of the pet.
   * This is the human-readable name shown to users in the game.
   */
  name: string;

  /**
   * Description of the pet.
   * This is the human-readable description shown to users in the game.
   */
  description: string;

  /**
   * Icon/Image URL of the pet.
   * This is the icon shown to users in the game. Can be a Roblox asset ID (rbxassetid://) or external URL.
   */
  icon: string;

  /**
   * Movement type of the pet.
   * This is the movement type of the pet (e.g., Grounded, Flight).
   */
  movementType: MovementType;

  /**
   * Movement speed of the pet.
   * This is the movement speed of the pet measured in units per second.
   */
  movementSpeed: number;

  /**
   * Default hunger of the pet.
   * This is the default hunger value when the pet is first created.
   */
  defaultHunger: number;

  /**
   * Sell price of the pet.
   * This is the sell price in in-game currency that players receive when selling this pet.
   */
  sellPrice: number;

  /**
   * Scaling factor applied to the pet model for each level gained.
   * Controls how much the pet grows as it levels up.
   */
  modelScalePerLevel: number;

  /**
   * Vertical height scaling factor for the pet model.
   * Controls how tall the pet appears. Null if not applicable.
   */
  yHeightScaler: number | null;

  /**
   * Whether the pet has a tool weld offset.
   * Used for positioning the pet model correctly. Null if not applicable.
   */
  toolWeldOffset: boolean | null;

  /**
   * Whether the pet requires two hands to hold.
   * Used for positioning and animation. Null if not applicable.
   */
  twoHanded: boolean | null;

  /**
   * Animations configuration for the pet.
   * Array of animation definitions.
   */
  animations: unknown[];

  /**
   * Actions configuration for the pet.
   * Array of action definitions.
   */
  actions: unknown[];

  /**
   * Hunger fruit multipliers configuration.
   * Array mapping fruit types to their hunger restoration multipliers when fed to the pet.
   */
  hungerFruitMultipliers: unknown[];

  /**
   * Pet states configuration.
   * Array containing various state definitions (e.g., idle, walking, eating).
   */
  states: unknown[];

  /**
   * Rarity ID of the pet.
   * Foreign key reference to the global rarity this pet belongs to.
   */
  rarityId: string;

  /**
   * Rarity of the pet.
   * This is the global rarity entity relation, populated when loading relations.
   */
  rarity?: Rarity;

  /**
   * Passives assigned to the pet.
   * Array of pet passive entities, populated when loading relations.
   */
  passives?: PetPassive[];

  /**
   * Timestamp indicating when the pet record was created in the database.
   */
  createdAt: Date;

  /**
   * Timestamp indicating when the pet record was last updated in the database.
   */
  updatedAt: Date;

  /**
   * Timestamp indicating when this pet data was last synced from the datahub.
   * Updated automatically during sync operations.
   * Null if the record has never been synced.
   */
  lastSyncedAt: Date | null;

  /**
   * Timestamp indicating when the pet record was deleted in the database.
   * Null if the record has not been deleted.
   */
  deletedAt?: Date | null;
}

export const petSortFields = [
  "key",
  "name",
  "rarityLevel",
  "createdAt",
  "updatedAt",
  "lastSyncedAt",
] as const;

export const petOrderFields = ["asc", "desc"] as const;

export const findAllPetsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  key: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  movementType: z.enum(MovementType).optional(),
  rarityKeys: z.string().optional(),
  passiveStates: z.string().optional(),
  sort: z.enum(petSortFields).default("lastSyncedAt"),
  order: z.enum(petOrderFields).default("desc"),
});

export type FindAllPetsQuery = z.infer<typeof findAllPetsQuerySchema>;

/**
 * nuqs parser descriptor for pets search params.
 *
 * Mirrors {@link findAllPetsQuerySchema} exactly, meaning:
 * - Field names, types, and defaults must stay in sync with the Zod schema.
 * - Used by both server-side loaders (createLoader) and client-side useQueryStates.
 * - Any schema change must be reflected here to avoid URL/query mismatches.
 */
export const petsSearchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(20),
  key: parseAsString,
  name: parseAsString.withDefault(""),
  description: parseAsString,
  movementType: parseAsStringEnum([MovementType.Grounded, MovementType.Flight]),
  rarityKeys: parseAsString,
  passiveStates: parseAsString,
  sort: parseAsStringEnum([...petSortFields]).withDefault("lastSyncedAt"),
  order: parseAsStringEnum([...petOrderFields]).withDefault("desc"),
} as const;
