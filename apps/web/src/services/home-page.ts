import { TStrapiSingleResponse } from "@/types/strapi.type";
import { fetchInstance } from "./config";
import { THomePage } from "@/types/home-page.type";

export const HomeService = {
  async getAll() {
    return fetchInstance<TStrapiSingleResponse<THomePage>>(
      "/home-page?populate[heroBlock][populate]=*",
    );
  },
};
