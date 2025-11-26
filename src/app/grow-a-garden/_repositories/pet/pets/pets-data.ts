import type { ApiResponse, PaginationMeta } from "@/types/global";
import type {
  Pet,
  FindAllPetsQuery,
} from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import { findAllPetsQuerySchema } from "@/app/grow-a-garden/_repositories/pet/pets/pets-type";
import { resolveBaseUrl } from "@/helpers/resolve-base-url";
import { buildSearchParams } from "@/helpers/build-search-params";

export interface PetsResponse {
  data: Pet[];
  pagination?: PaginationMeta;
}

export async function fetchPets(
  params: Partial<FindAllPetsQuery> = {},
  init?: RequestInit
): Promise<ApiResponse<Pet[]>> {
  const baseUrl = resolveBaseUrl();
  const validated = findAllPetsQuerySchema.parse(params);

  const searchParams = buildSearchParams({
    page: validated.page,
    limit: validated.limit,
    key: validated.key,
    name: validated.name,
    description: validated.description,
    movementType: validated.movementType,
    rarityKeys: validated.rarityKeys,
    passiveStates: validated.passiveStates,
    sort: validated.sort,
    order: validated.order,
  });

  const queryString = searchParams.toString();
  const response = await fetch(
    `${baseUrl}/api/madebynoob/grow-a-garden/wiki/pets${
      queryString ? `?${queryString}` : ""
    }`,
    {
      cache: "force-cache",
      ...init,
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch pets";
    try {
      const errorBody = await response.text();
      message = `${message}: ${errorBody || response.statusText}`;
    } catch {
      // ignore parsing error, use default message
    }

    throw new Error(message);
  }

  const json = await response.json();
  return json;
}

/**
 * Client-side fetch function for pets.
 * Fetches directly to API route without using resolveBaseUrl to avoid extra hop.
 */
export async function fetchPetsClient(
  params: Partial<FindAllPetsQuery> = {}
): Promise<PetsResponse> {
  const validated = findAllPetsQuerySchema.parse(params);

  const searchParams = buildSearchParams({
    page: validated.page,
    limit: validated.limit,
    key: validated.key,
    name: validated.name,
    description: validated.description,
    movementType: validated.movementType,
    rarityKeys: validated.rarityKeys,
    passiveStates: validated.passiveStates,
    sort: validated.sort,
    order: validated.order,
  });

  const queryString = searchParams.toString();
  const response = await fetch(
    `/api/madebynoob/grow-a-garden/wiki/pets${
      queryString ? `?${queryString}` : ""
    }`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch pets";
    try {
      const errorBody = await response.text();
      message = `${message}: ${errorBody || response.statusText}`;
    } catch {
      // ignore parsing error, use default message
    }
    throw new Error(message);
  }

  const json = (await response.json()) as ApiResponse<Pet[]>;

  if ("data" in json) {
    return {
      data: json.data as Pet[],
      pagination: json.meta?.pagination,
    };
  }

  const errorMessage = Array.isArray(json.message)
    ? json.message.join(", ")
    : json.message;
  throw new Error(errorMessage);
}

/**
 * Fetches a single pet by slug.
 * Returns a single Pet object, not an array.
 *
 * @param slug - The slug of the pet to fetch
 * @param init - Optional fetch init options
 * @returns Promise resolving to ApiResponse<Pet> (single pet, not array)
 */
export async function fetchPetBySlug(
  slug: string,
  init?: RequestInit
): Promise<ApiResponse<Pet>> {
  const baseUrl = resolveBaseUrl();

  if (!slug || slug.trim() === "") {
    throw new Error("Pet slug is required");
  }

  const response = await fetch(
    `${baseUrl}/api/madebynoob/grow-a-garden/wiki/pets/${encodeURIComponent(
      slug
    )}`,
    {
      cache: "force-cache",
      ...init,
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch pet";
    try {
      const errorBody = await response.text();
      message = `${message}: ${errorBody || response.statusText}`;
    } catch {
      // ignore parsing error, use default message
    }

    throw new Error(message);
  }

  const json = await response.json();
  return json;
}
