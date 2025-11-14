import type { z } from "zod";

/**
 * Parse and validate query parameters from URL
 * Only requires schema and default query, handles everything else automatically
 * URL searchParams field names must match schema field names
 */
export function parseAndValidateQueryParams<
  T extends z.ZodObject<z.ZodRawShape>
>(
  searchParams: { [key: string]: string | string[] | undefined },
  schema: T,
  defaultQuery: z.infer<T> & { page: number; limit: number }
): {
  queryParams: z.infer<T> & { page: number; limit: number };
  validatedValues: Record<string, unknown>;
} {
  // Map URL searchParams to raw query object based on schema shape
  const rawQuery: Record<string, unknown> = {};
  const shape = schema.shape;

  // Map all fields from searchParams that exist in schema
  for (const key in shape) {
    const value = searchParams[key];
    if (value !== undefined) {
      // Convert array to comma-separated string for validation
      rawQuery[key] = Array.isArray(value) ? value.join(",") : value;
    }
  }

  // Validate query params using schema (defaults are applied by Zod)
  const validatedQuery = schema.safeParse(rawQuery);

  // Use validated query if valid, otherwise use DEFAULT
  const queryParams: z.infer<T> & { page: number; limit: number } =
    validatedQuery.success
      ? (validatedQuery.data as z.infer<T> & { page: number; limit: number })
      : defaultQuery;

  // Return validated values as-is (no transformation)
  const validatedValues = validatedQuery.success
    ? (validatedQuery.data as Record<string, unknown>)
    : {};

  return {
    queryParams,
    validatedValues,
  };
}
