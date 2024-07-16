const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
export const TELEGRAM_BASE_URL = `${process.env.NEXT_PUBLIC_TELEGRAM_URL}${process.env.NEXT_PUBLIC_BOT_TOKEN}`;

export async function fetchInstance<T>(
  path: string,
  options?: any,
): Promise<T> {
  const response = await fetch(`${BASE_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 180,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
