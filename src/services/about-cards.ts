import { TAboutCard } from "@/types/about-card.type";
import { TStrapiResponseArray } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const AboutCardsService = {
  async getAll() {
    return fetchInstance<TStrapiResponseArray<TAboutCard>>(
      "/about-cards?populate=*",
    );
  },
};
