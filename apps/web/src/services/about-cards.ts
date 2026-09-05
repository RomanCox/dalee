import { TAboutCard } from "@/types/about-card.type";
import { TStrapiCollectionResponse } from "@/types/strapi.type";
import { newFetchInstance } from "./config";

export const AboutCardsService = {
  async getAll() {
    return newFetchInstance<TStrapiCollectionResponse<TAboutCard>>(
      "/about-cards?populate=*",
    );
  },
};
