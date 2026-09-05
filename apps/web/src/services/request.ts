import { TRequestSection } from "@/types/request.type";
import { TStrapiResponse } from "@/types/strapi.type";
import { TELEGRAM_BASE_URL, fetchInstance } from "./config";

export const RequestSectionService = {
  async getAll() {
    return fetchInstance<TStrapiResponse<TRequestSection>>(
      "/request-section?populate=*",
    );
  },
};

export const RequestService = {
  async send(body: any) {
    return fetch(`${TELEGRAM_BASE_URL}/sendMessage`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
