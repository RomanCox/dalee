import { TStrapiResponse } from "@/types/strapi.type";
import { fetchInstance } from "./config";
import { THomePage } from "@/types/home-page.type";

export const HomeService = {
  async getAll() {
    return fetchInstance<TStrapiResponse<THomePage>>(
      "/home-page?populate=*,heroBlock.title,heroBlock.description,heroBlock.background,heroBlock.backgroundMobile",
    );
  },
};
