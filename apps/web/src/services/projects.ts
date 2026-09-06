import { TProjectResponse } from "@/types/projects.type";
import { TStrapiCollectionResponse } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const ProjectsService = {
  async getAll() {
    return fetchInstance<TStrapiCollectionResponse<TProjectResponse>>(
      "/projects?populate=*&sort=id",
    );
  },
};
