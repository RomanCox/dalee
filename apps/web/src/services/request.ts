import { TRequestSection } from "@/types/request.type";
import { TStrapiSingleResponse } from "@/types/strapi.type";
import { TELEGRAM_BASE_URL, fetchInstance } from "./config";

export const RequestSectionService = {
  async getAll() {
    return fetchInstance<TStrapiSingleResponse<TRequestSection>>(
      "/request-section?populate=*",
    );
  },
};

type TTelegramSendMessageBody = {
  chat_id: string;
  text: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
  link_preview_options?: {
    isDisabled?: boolean;
  };
};

export const RequestService = {
  async send(body: TTelegramSendMessageBody) {
    return fetch(`${TELEGRAM_BASE_URL}/sendMessage`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
