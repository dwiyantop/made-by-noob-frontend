import type { ApiResponse } from "@/types/global";
import { resolveBaseUrl } from "@/helpers/resolve-base-url";

export async function fetchPassiveStateKeys(): Promise<ApiResponse<string[]>> {
  const baseUrl = resolveBaseUrl();

  const response = await fetch(
    `${baseUrl}/api/madebynoob/grow-a-garden/pet/pet-passives/state-keys`,
    {
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    let message = "Failed to fetch passive state keys";
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
