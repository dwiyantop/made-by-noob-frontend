import type { z } from "zod";

/**
 * Parse and validate query parameters from URL
 * Uses Zod schema defaults automatically, no need for separate default query
 * URL searchParams field names must match schema field names
 */
export function parseAndValidateQueryParams<
  T extends z.ZodObject<z.ZodRawShape>
>(
  searchParams: { [key: string]: string | string[] | undefined },
  schema: T
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
  // If validation fails, use schema defaults by parsing empty object
  const validatedQuery = schema.safeParse(rawQuery);
  const queryParams: z.infer<T> & { page: number; limit: number } =
    validatedQuery.success
      ? (validatedQuery.data as z.infer<T> & { page: number; limit: number })
      : (schema.parse({}) as z.infer<T> & { page: number; limit: number });

  // Return validated values as-is (no transformation)
  const validatedValues = validatedQuery.success
    ? (validatedQuery.data as Record<string, unknown>)
    : {};

  return {
    queryParams,
    validatedValues,
  };
}
