import { TProjectResponse } from "@/types/projects.type";
import { TStrapiResponseArray } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const ProjectsService = {
  async getAll() {
    return fetchInstance<TStrapiResponseArray<TProjectResponse>>(
      "/projects?populate=*&sort=id",
    );
  },
};
