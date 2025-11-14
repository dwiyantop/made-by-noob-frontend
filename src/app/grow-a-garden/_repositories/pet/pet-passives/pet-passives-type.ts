export interface PetPassive {
  /**
   * Unique identifier for the pet passives record in the database.
   * This is typically an auto-generated UUID or database ID.
   */
  id: string;

  /**
   * Unique identifier for the passives obtained from the Grow a Garden datahub.
   * This key is used to reference the passives in the game's data system.
   * Must be unique across all pet passives.
   */
  key: string;

  /**
   * Display name of the pet passives.
   * This is the human-readable name shown to users in the game.
   */
  name: string;

  /**
   * Description of the pet passives.
   * This is the human-readable description shown to users in the game.
   */
  description: string;

  /**
   * Description of the pet passives with states combined.
   * This is the human-readable description shown to users in the game with the states combined.
   */
  descriptionWithStates: string;

  /**
   * Timestamp indicating when the pet passives record was created in the database.
   */
  createdAt: Date;

  /**
   * Timestamp indicating when the pet passives record was last updated in the database.
   */
  updatedAt: Date;

  /**
   * Timestamp indicating when this pet passives data was last synced from the datahub.
   * Updated automatically during sync operations.
   * Null if the record has never been synced.
   */
  lastSyncedAt: Date | null;

  /**
   * Timestamp indicating when the pet passives record was deleted in the database.
   * Null if the record has not been deleted.
   */
  deletedAt?: Date | null;

  /**
   * Related pet passive states.
   * Populated when querying with relations.
   */
  states?: PetPassiveState[];
}

/**
 * Represents a pet passive state configuration.
 * This interface defines the structure for individual state values within a pet passive.
 */
export interface PetPassiveState {
  /**
   * Unique identifier for the pet passive state record in the database.
   * This is typically an auto-generated UUID or database ID.
   */
  id: string;

  /**
   * Foreign key reference to the pet passive this state belongs to.
   */
  petPassiveId: string;

  /**
   * Key/name of the state (e.g., "Chance", "Range", "Multiplier", "Cooldown").
   * This identifies what type of state this is.
   */
  stateKey: string;

  /**
   * Base value for the state.
   * This is the primary value used in calculations and display.
   */
  baseValue: number;

  /**
   * Maximum value for the state.
   * Null if not applicable for this state.
   */
  maxValue: number | null;

  /**
   * Minimum value for the state.
   * Null if not applicable for this state.
   */
  minValue: number | null;

  /**
   * Scale value for the state.
   * Used for incremental calculations.
   * Null if not applicable for this state.
   */
  scaleValue: number | null;

  /**
   * Formatter type for displaying the state value.
   * Examples: "ColonTime" for time formatting.
   * Null if default formatting is used.
   */
  formatter: string | null;

  /**
   * Timestamp indicating when this pet passive state data was last synced from the datahub.
   * Updated automatically during sync operations.
   * Null if the record has never been synced.
   */
  lastSyncedAt: Date | null;

  /**
   * Timestamp indicating when the pet passive state record was created in the database.
   */
  createdAt: Date;

  /**
   * Timestamp indicating when the pet passive state record was last updated in the database.
   */
  updatedAt: Date;
}
