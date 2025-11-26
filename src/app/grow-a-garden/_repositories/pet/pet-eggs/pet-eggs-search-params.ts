import { parseAsString } from "nuqs/server";
import { createWikiSearchParams } from "@/app/grow-a-garden/wiki/_lib/create-wiki-search-params";

// Shared search params parsers for server and client
// Reuse this descriptor in both server-side loader and client-side useQueryStates
export const petEggsSearchParams = createWikiSearchParams({
  itemTypes: parseAsString,
});
