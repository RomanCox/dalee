import { TAboutCard } from "@/types/about-card.type";
import { TStrapiCollectionResponse } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const AboutCardsService = {
  async getAll() {
    return fetchInstance<TStrapiCollectionResponse<TAboutCard>>(
      "/about-cards?populate=*",
    );
  },
};
