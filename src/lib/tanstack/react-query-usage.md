# TanStack Query Usage Guide

## Setup Complete ✅

TanStack Query sudah terintegrasi dan siap digunakan untuk SSR dan CSR.

## Usage Examples

### 1. Client-Side Rendering (CSR)

Gunakan `useQuery` di Client Components:

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

export function PetsList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const res = await fetch('/api/pets');
      return res.json();
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render data */}</div>;
}
```

### 2. Server-Side Rendering (SSR)

Prefetch data di Server Component dan hydrate di Client:

```tsx
import { prefetchQuery, Hydrate } from '@/lib/tanstack/react-query-ssr';
import { PetsList } from './pets-list';

export default async function PetsPage() {
  // Prefetch data on server
  const queryClient = await prefetchQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const res = await fetch('https://api.example.com/pets');
      return res.json();
    },
  });

  return (
    <Hydrate queryClient={queryClient}>
      <PetsList />
    </Hydrate>
  );
}
```

### 3. Mutations (CSR)

```tsx
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function CreatePetForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPet: { name: string }) => {
      const res = await fetch('/api/pets', {
        method: 'POST',
        body: JSON.stringify(newPet),
      });
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      mutation.mutate({ name: 'New Pet' });
    }}>
      {/* Form fields */}
    </form>
  );
}
```

### 4. Query Options

```tsx
useQuery({
  queryKey: ['pets', { category: 'rare' }],
  queryFn: fetchPets,
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  refetchOnWindowFocus: false,
  retry: 3,
});
```

## Key Points

- ✅ **SSR Support**: Use `prefetchQuery` + `Hydrate` in Server Components
- ✅ **CSR Support**: Use `useQuery` directly in Client Components
- ✅ **DevTools**: Available in development mode (bottom left corner)
- ✅ **Automatic Caching**: Queries are cached and deduplicated automatically
- ✅ **TypeScript**: Full type safety support

## Configuration

Default configuration ada di `src/lib/tanstack/react-query.ts`:
- `staleTime`: 60 seconds
- `refetchOnWindowFocus`: false
- `retry`: 1

Anda bisa customize sesuai kebutuhan.

