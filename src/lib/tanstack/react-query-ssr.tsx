import React from 'react';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/tanstack/react-query';

/**
 * Helper function to prefetch queries on the server
 * Use this in Server Components to prefetch data
 *
 * @example
 * ```tsx
 * const queryClient = await prefetchQuery({
 *   queryKey: ['pets'],
 *   queryFn: () => fetchPets(),
 * });
 *
 * return (
 *   <Hydrate queryClient={queryClient}>
 *     <PetsPage />
 *   </Hydrate>
 * );
 * ```
 */
export async function prefetchQuery<T>(options: {
  queryKey: unknown[];
  queryFn: () => Promise<T>;
  staleTime?: number;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    staleTime: options.staleTime,
  });
  return queryClient;
}

/**
 * Helper component to hydrate prefetched queries
 * Use this in Server Components after prefetching
 *
 * @example
 * ```tsx
 * const queryClient = await prefetchQuery({ ... });
 * return <Hydrate queryClient={queryClient}>...</Hydrate>;
 * ```
 */
export function Hydrate({ queryClient, children }: { queryClient: QueryClient; children: React.ReactNode }) {
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
