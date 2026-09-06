const BASE_URL = import.meta.env.VITE_STRAPI_URL;
export const TELEGRAM_BASE_URL = `${import.meta.env.VITE_TELEGRAM_URL}${import.meta.env.VITE_BOT_TOKEN}`;

export async function fetchInstance<T>(
  path: string,
  options?: any,
): Promise<T> {
  const response = await fetch(`${BASE_URL}/api${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}