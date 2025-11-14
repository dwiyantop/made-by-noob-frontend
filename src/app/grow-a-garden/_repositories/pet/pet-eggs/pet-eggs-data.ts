import type { ApiResponse } from "@/types/global";
import type {
  PetEgg,
  FindAllPetEggsQuery,
} from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { findAllPetEggsQuerySchema } from "@/app/grow-a-garden/_repositories/pet/pet-eggs/pet-eggs-type";
import { resolveBaseUrl } from "@/helpers/resolve-base-url";
import { buildSearchParams } from "@/helpers/build-search-params";

export async function fetchPetEggs(
  params: Partial<FindAllPetEggsQuery> = {},
  init?: RequestInit
) {
  const baseUrl = resolveBaseUrl();
  const validated = findAllPetEggsQuerySchema.parse(params);

  const searchParams = buildSearchParams({
    page: validated.page,
    limit: validated.limit,
    key: validated.key,
    name: validated.name,
    rarityKeys: validated.rarityKeys,
    itemTypes: validated.itemTypes,
    sort: validated.sort,
    order: validated.order,
  });

  const queryString = searchParams.toString();
  const response = await fetch(
    `${baseUrl}/api/madebynoob/grow-a-garden/wiki/pet-eggs${
      queryString ? `?${queryString}` : ""
    }`,
    {
      cache: "force-cache",
      ...init,
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch pet eggs";
    try {
      const errorBody = await response.text();
      message = `${message}: ${errorBody || response.statusText}`;
    } catch {
      // ignore parsing error, use default message
    }

    throw new Error(message);
  }

  const json = (await response.json()) as ApiResponse<PetEgg[]>;
  return json;
}

/**
 * Client-side fetch function for pet eggs.
 * Fetches directly to API route without using resolveBaseUrl to avoid extra hop.
 */
export async function fetchPetEggsClient(
  params: Partial<FindAllPetEggsQuery> = {}
): Promise<PetEgg[]> {
  const validated = findAllPetEggsQuerySchema.parse(params);

  const searchParams = buildSearchParams({
    page: validated.page,
    limit: validated.limit,
    key: validated.key,
    name: validated.name,
    rarityKeys: validated.rarityKeys,
    itemTypes: validated.itemTypes,
    sort: validated.sort,
    order: validated.order,
  });

  const queryString = searchParams.toString();
  const response = await fetch(
    `/api/madebynoob/grow-a-garden/wiki/pet-eggs${
      queryString ? `?${queryString}` : ""
    }`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch pet eggs";
    try {
      const errorBody = await response.text();
      message = `${message}: ${errorBody || response.statusText}`;
    } catch {
      // ignore parsing error, use default message
    }
    throw new Error(message);
  }

  const json = (await response.json()) as ApiResponse<PetEgg[]>;

  if ("data" in json) {
    return json.data as PetEgg[];
  }

  const errorMessage = Array.isArray(json.message)
    ? json.message.join(", ")
    : json.message;
  throw new Error(errorMessage);
}
