import { TStrapiSingleResponse } from "@/types/strapi.type";
import { newFetchInstance } from "./config";
import { THomePage } from "@/types/home-page.type";

export const HomeService = {
  async getAll() {
    return newFetchInstance<TStrapiSingleResponse<THomePage>>(
      "/home-page?populate[heroBlock][populate]=*",
    );
  },
};
