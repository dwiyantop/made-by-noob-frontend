import { NextResponse } from "next/server";

const API_URL = process.env.MADEBYNOOB_API_URL;
const API_KEY = process.env.MADEBYNOOB_API_KEY;

const PATH_ALIAS_MAP: Record<string, string> = {
  "grow-a-garden/rarities": "/roblox/grow-a-garden/rarities",
  "grow-a-garden/wiki/pets": "/roblox/grow-a-garden/pet/pets",
  "grow-a-garden/wiki/pet-eggs": "/roblox/grow-a-garden/pet/pet-eggs",
  "grow-a-garden/wiki/pet-passives": "/roblox/grow-a-garden/pet/passives",
  "grow-a-garden/pet/pet-passives/state-keys":
    "/roblox/grow-a-garden/pet/pet-passives/state-keys",
};

const PERMANENT_CACHE_PATHS = new Set([
  "grow-a-garden/rarities",
  "grow-a-garden/pet-passives/keys",
]);

interface RouteParams {
  slug?: string[];
}

export async function GET(
  request: Request,
  context: { params: Promise<RouteParams> }
) {
  if (!API_URL || !API_KEY) {
    return NextResponse.json(
      {
        error:
          "MadeByNoob API configuration is missing. Please set MADEBYNOOB_API_URL and MADEBYNOOB_API_KEY.",
      },
      { status: 500 }
    );
  }

  const { slug } = await context.params;

  if (!slug || slug.length === 0) {
    return NextResponse.json(
      {
        error: "Missing API path slug.",
      },
      { status: 400 }
    );
  }

  const incomingUrl = new URL(request.url);
  const incomingPath = slug.join("/");
  const isPermanentCache = PERMANENT_CACHE_PATHS.has(incomingPath);

  // Handle dynamic pet slug route: grow-a-garden/wiki/pets/{slug} -> /roblox/grow-a-garden/pet/pets/slug/{slug}
  const petSlugMatch = incomingPath.match(/^grow-a-garden\/wiki\/pets\/(.+)$/);
  // Handle dynamic egg slug route: grow-a-garden/wiki/eggs/{slug} -> /roblox/grow-a-garden/pet/pet-eggs/slug/{slug}
  const eggSlugMatch = incomingPath.match(/^grow-a-garden\/wiki\/eggs\/(.+)$/);
  let mappedPath: string;
  if (petSlugMatch) {
    const petSlug = petSlugMatch[1];
    mappedPath = `/roblox/grow-a-garden/pet/pets/slug/${petSlug}`;
  } else if (eggSlugMatch) {
    const eggSlug = eggSlugMatch[1];
    mappedPath = `/roblox/grow-a-garden/pet/pet-eggs/slug/${eggSlug}`;
  } else {
    mappedPath = PATH_ALIAS_MAP[incomingPath] ?? `/${incomingPath}`;
  }

  const upstreamUrl = new URL(mappedPath, API_URL);

  incomingUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.set(key, value);
  });

  const upstream = await fetch(upstreamUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-API-Key": API_KEY,
    },
    cache: isPermanentCache ? "force-cache" : "no-store",
    next: isPermanentCache ? { revalidate: false } : undefined,
  });

  if (!upstream.ok) {
    const errorText = await upstream.text();
    return NextResponse.json(
      {
        error: "Failed to fetch data from MadeByNoob API",
        status: upstream.status,
        message: errorText,
      },
      { status: upstream.status }
    );
  }

  const data = await upstream.json();
  const response = NextResponse.json(data);

  if (isPermanentCache) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  return response;
}
