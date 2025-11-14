import type { ApiResponse } from "@/types/global";
import type {
  Rarity,
  FindAllRaritiesQuery,
} from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import { resolveBaseUrl } from "@/helpers/resolve-base-url";
import { findAllRaritiesQuerySchema } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import { buildSearchParams } from "@/helpers/build-search-params";

export async function fetchRarities(
  params: Partial<FindAllRaritiesQuery> = {}
) {
  const baseUrl = resolveBaseUrl();
  const validated = findAllRaritiesQuerySchema.parse(params);

  const searchParams = buildSearchParams({
    page: validated.page,
    limit: validated.limit,
    key: validated.key,
    name: validated.name,
    level: validated.level,
    sort: validated.sort,
    order: validated.order,
  });

  const queryString = searchParams.toString();
  const response = await fetch(
    `${baseUrl}/api/madebynoob/grow-a-garden/rarities${
      queryString ? `?${queryString}` : ""
    }`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch rarities";
    try {
      const errorBody = await response.text();
      message = `${message}: ${errorBody || response.statusText}`;
    } catch {
      // ignore parsing error, use default message
    }

    throw new Error(message);
  }

  const json = (await response.json()) as ApiResponse<Rarity[]>;
  return json;
}
