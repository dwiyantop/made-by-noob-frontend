export function resolveBaseUrl() {
  if (process.env.APP_SITE_URL) {
    return process.env.APP_SITE_URL;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  const port = process.env.PORT ?? "3001";
  return `http://localhost:${port}`;
}
