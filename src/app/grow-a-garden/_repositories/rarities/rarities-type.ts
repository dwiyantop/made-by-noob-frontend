import { z } from "zod";

/**
 * Represents a global rarity configuration in the Grow a Garden game.
 * This interface defines the structure for rarity data that can be extracted
 * from the datahub and stored in the database.
 */
export interface Rarity {
  /**
   * Unique identifier for the rarity record in the database.
   * This is typically an auto-generated UUID or database ID.
   */
  id: string;

  /**
   * Unique identifier for the rarity obtained from the Grow a Garden datahub.
   * This key is used to reference the rarity in the game's data system.
   * Must be unique across all rarities.
   */
  key: string;

  /**
   * Display name of the rarity.
   * This is the human-readable name shown to users in the game.
   */
  name: string;

  /**
   * Level/rank of the rarity.
   * Lower numbers represent lower rarity levels (e.g., 1 = Common, 5 = Legendary).
   * Used for sorting and determining rarity hierarchy.
   */
  level: number;

  /**
   * Additional metadata stored as JSON.
   * Can contain any extra information related to the rarity that does not fit into the standard fields.
   */
  metaData: Record<string, unknown> | null;

  /**
   * Timestamp indicating when the rarity record was created in the database.
   */
  createdAt: Date;

  /**
   * Timestamp indicating when the rarity record was last updated in the database.
   */
  updatedAt: Date;

  /**
   * Timestamp indicating when this rarity data was last synced from the datahub.
   * Updated automatically during sync operations.
   * Null if the record has never been synced.
   */
  lastSyncedAt: Date | null;

  /**
   * Timestamp indicating when the rarity record was deleted in the database.
   * Null if the record has not been deleted.
   */
  deletedAt?: Date | null;
}

export const raritySortFields = [
  "key",
  "name",
  "level",
  "createdAt",
  "updatedAt",
  "lastSyncedAt",
] as const;

export const rarityOrderFields = ["asc", "desc"] as const;

export const findAllRaritiesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  level: z.coerce.number().int().min(1).optional(),
  sort: z.enum(raritySortFields).optional(),
  order: z.enum(rarityOrderFields).optional(),
});

export type FindAllRaritiesQuery = z.infer<typeof findAllRaritiesQuerySchema>;
