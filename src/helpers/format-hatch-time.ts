/**
 * Formats hatch time from seconds to a human-readable string.
 * Examples:
 * - 60 -> "1 minute"
 * - 300 -> "5 minutes"
 * - 3660 -> "1 hour 1 minute"
 * - 7200 -> "2 hours"
 */
export function formatHatchTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }

  if (hours === 0 && minutes === 0 && remainingSeconds > 0) {
    parts.push(
      `${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}`
    );
  }

  return parts.join(" ") || "0 seconds";
}
