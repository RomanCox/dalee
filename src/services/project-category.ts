import { TStrapiResponseArray } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const ProjectCategoryService = {
  async getAll() {
    return fetchInstance<TStrapiResponseArray<any>>(
      "/project-category?populate=*",
    );
  },
};
