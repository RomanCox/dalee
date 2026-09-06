import { NewTStrapiMedia } from "./strapi.type";

export type TCommon = {
  navigation: TNavigationItem[];
  contacts: TContacts;
  socials: TSocial[];
  ourVacanciesLink: string;
  location: string;
};

export type TSocial = {
  id: number;
  key: string;
  link: string;
};

export type TContacts = {
  address: string;
  email: string;
  phone: string;
  commonPhone: string;
  clientsPhone: string;
  addressLink: string;
};

type TNavigationItem = {
  id: number;
  title: string;
  url: string;
};

export type THeroBlock = {
  title: string[];
  description: string[];
  background: NewTStrapiMedia;
  backgroundMobile: NewTStrapiMedia;
};
