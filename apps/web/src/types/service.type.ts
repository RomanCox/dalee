import { TCardVariant } from "./global";
import { NewTStrapiMedia } from "./strapi.type";

export type TService = {
  title: string;
  type: TCardVariant;
  description?: string;
  imageUrl?: NewTStrapiMedia;
  position: number;
};