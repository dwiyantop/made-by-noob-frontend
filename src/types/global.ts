/**
 * Global type definitions shared across the MadeByNoob frontend codebase.
 */

/** Pagination metadata returned by the MadeByNoob API */
export interface PaginationMeta {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  totalEntries: number;
}

/** Meta field returned by the MadeByNoob API */
export interface ApiMeta {
  pagination?: PaginationMeta;
  processingTime?: string;
  [key: string]: unknown;
}

/** Successful API response envelope */
export interface ApiSuccessResponse<T> {
  status: number; // HTTP status code
  message: string; // HTTP status message
  data: T;
  meta?: ApiMeta;
}

/** Error response envelope */
export interface ApiErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
}

/** Union type for API responses */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/** Generic paginated data payload */
export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationMeta;
}

/** Utility types */
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

/** Request options when calling our MadeByNoob backend */
export interface MadeByNoobRequestOptions {
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}
