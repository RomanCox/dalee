import { TCardVariant } from "./global";

export type TAboutCard = {
  id: number;
  title: string;
  type: Partial<TCardVariant>;
  description: string;
};
