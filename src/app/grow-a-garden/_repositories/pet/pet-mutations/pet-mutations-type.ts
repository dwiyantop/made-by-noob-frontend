import { PetPassive } from "@/app/grow-a-garden/_repositories/pet/pet-passives/pet-passives-type";

export interface PetMutation {
  /** Unique identifier for the pet mutation record. */
  id: string;

  /** Unique key sourced from the Grow a Garden datahub. */
  key: string;

  /** Human-readable name of the mutation. */
  name: string;

  /** Short enumerated identifier (EnumId) used by the game. */
  enumId: string;

  /** Indicates whether the mutation can be obtained from the mutation machine. */
  availableFromMutationMachine: boolean;

  /** Value multiplier applied when the mutation is active. */
  valueMultiplier: number;

  /** Chance (percentage) to obtain this mutation when rolled. */
  chance: number;

  /** Boosts granted by the mutation. */
  boosts?: PetMutationBoost[];

  /** Passives granted by the mutation. */
  passives?: PetMutationPassive[];

  /** Timestamp of creation. */
  createdAt: Date;

  /** Timestamp of last update. */
  updatedAt: Date;

  /** Timestamp of the most recent sync operation. */
  lastSyncedAt: Date | null;

  /** Timestamp of soft deletion. */
  deletedAt?: Date | null;
}

export interface PetMutationBoost {
  /** Unique identifier for the boost record. */
  id: string;

  /** Owning mutation identifier. */
  petMutationId: string;

  /** Numeric amount applied by the boost. */
  boostAmount: number;

  /** Type of boost (PASSIVE_BOOST, SIZE_MODIFICATION, PET_XP_BOOST, etc.). */
  boostType: string;

  /** Timestamp of creation. */
  createdAt: Date;

  /** Timestamp of last update. */
  updatedAt: Date;

  /** Timestamp of the most recent sync operation. */
  lastSyncedAt: Date | null;

  /** Timestamp of soft deletion. */
  deletedAt?: Date | null;
}

export interface PetMutationPassive {
  /** Unique identifier for the mutation/passive join row. */
  id: string;

  /** Owning mutation identifier. */
  petMutationId: string;

  /** Linked pet passive identifier. */
  petPassiveId: string;

  /** Loaded pet passive relation. */
  passive: PetPassive;

  /** Timestamp of creation. */
  createdAt: Date;

  /** Timestamp of last update. */
  updatedAt: Date;

  /** Timestamp of the most recent sync operation. */
  lastSyncedAt: Date | null;

  /** Timestamp of soft deletion. */
  deletedAt?: Date | null;
}
