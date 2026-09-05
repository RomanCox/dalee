/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_URL: string;
  readonly VITE_LOCAL_STRAPI_URL: string;
  readonly VITE_TELEGRAM_URL: string;
  readonly VITE_BOT_TOKEN: string;
  readonly VITE_CHAT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
