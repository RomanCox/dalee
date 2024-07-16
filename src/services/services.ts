import { TService } from "@/types/service.type";
import { TStrapiResponseArray } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const ServicesService = {
  async getAll() {
    return fetchInstance<TStrapiResponseArray<TService>>(
      "/services?populate=*",
    );
  },
};
