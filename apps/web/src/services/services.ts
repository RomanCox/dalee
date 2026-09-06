import { TService } from "@/types/service.type";
import { TStrapiCollectionResponse } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const ServicesService = {
  async getAll() {
    return fetchInstance<TStrapiCollectionResponse<TService>>(
      "/services?populate=*",
    );
  },
};

