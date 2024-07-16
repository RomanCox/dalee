import { TProject } from "@/types/projects.type";
import { TStrapiResponseArray } from "@/types/strapi.type";
import { fetchInstance } from "./config";

export const ProjectsService = {
  async getAll() {
    return fetchInstance<TStrapiResponseArray<TProject>>(
      "/projects?populate=*&sort=id",
    );
  },
};
