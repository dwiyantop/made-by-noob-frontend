/**
 * Formats a number using Intl.NumberFormat for consistent number display across the application.
 *
 * @param value - The number to format
 * @param options - Optional Intl.NumberFormatOptions for customization
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234567) // "1,234,567"
 * formatNumber(1234567, { notation: 'compact' }) // "1.2M"
 * formatNumber(1234.56, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) // "1,234.56"
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat("en-US", options).format(value);
}
