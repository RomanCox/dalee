import { TStrapiMedia } from "./strapi.type";

export type TProject = {
  title: string;
  area?: string;
  year?: string;
  image?: TStrapiMedia;
  location?: string;
  status?: "Реализация" | "";
  empty?: boolean;
};

export type TProjectWithId = {
  id: number;
  title: string;
  area?: string;
  year?: string;
  image?: TStrapiMedia;
  location?: string;
  status?: "Реализация" | "";
  empty?: boolean;
};