import { TService } from "@/types/service.type";
import { TStrapiCollectionResponse } from "@/types/strapi.type";
import { newFetchInstance } from "./config";

export const ServicesService = {
  async getAll() {
    return newFetchInstance<TStrapiCollectionResponse<TService>>(
      "/services?populate=*",
    );
  },
};

