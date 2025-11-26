import type { ApiResponse } from "@/types/global";
import type { Rarity } from "@/app/grow-a-garden/_repositories/rarities/rarities-type";
import { resolveBaseUrl } from "@/helpers/resolve-base-url";
import { buildSearchParams } from "@/helpers/build-search-params";

export async function fetchRarities(): Promise<ApiResponse<Rarity[]>> {
  const baseUrl = resolveBaseUrl();

  const searchParams = buildSearchParams({
    page: 1,
    limit: 50,
    sort: "level",
    order: "asc",
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

  const json = await response.json();
  return json;
}
