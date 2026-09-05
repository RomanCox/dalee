import { TStrapiSingleResponse } from "@/types/strapi.type";
import { newFetchInstance } from "./config";
import { TCommon } from "@/types/common.type";

export const CommonService = {
  async getAll() {
    return newFetchInstance<TStrapiSingleResponse<TCommon>>("/common?populate=*");
  },
};
