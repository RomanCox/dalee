import { TStrapiResponse } from "@/types/strapi.type";
import { fetchInstance } from "./config";
import { TCommon } from "@/types/common.type";

export const CommonService = {
  async getAll() {
    return fetchInstance<TStrapiResponse<TCommon>>("/common?populate=*");
  },
};
