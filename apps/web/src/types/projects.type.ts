import {NewTStrapiMedia, TStrapiResponseArray} from "./strapi.type";

export interface IITem {
  id: number;
  description: string;
  media: NewTStrapiMedia;
}

interface ISection {
  id: number;
  title: string;
  item: IITem[];
}

interface ICategory {
  id: number;
  title: string;
}

interface ITeammate {
  id: number;
  name: string;
  type: string;
  role: string;
}

export type TProjectResponse = {
  title: string;
  area?: string;
  year?: string;
  image?: NewTStrapiMedia | null;
  location?: string;
  project_categories?: ICategory[];
  status?: "Реализация" | "";
  customer?: string;
  empty?: boolean;
  onlyShowOnProjectsPage?: boolean;
  homePageOrder: number;
  projectsPageOrder: number;
  slug: string;
  sections: ISection[];
  teammates?: ITeammate[];
};

export type TProject = Omit<TProjectResponse, "project_categories" | "teammates"> & {
  id: number;
  project_categories?: string[];
  teammates?: string[];
};

export type TProjectCategory = {
  title: string;
  projects: TStrapiResponseArray<TProjectResponse>;
};