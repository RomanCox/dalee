import { TCardVariant } from "./global";

export type TAboutCard = {
  id: number;
  title: string;
  type: TCardVariant;
  description: string;
  onlyShowOnAboutUsPage?: boolean;
  homePageOrder: number;
  aboutUsPageOrder?: number;
};
