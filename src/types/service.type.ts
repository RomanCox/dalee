import { TCardVariant } from "./global";
import { TStrapiMedia } from "./strapi.type";

export type TService = {
  id: number;
  title: string;
  type: TCardVariant;
  description?: string;
  imageUrl?: TStrapiMedia;
};
