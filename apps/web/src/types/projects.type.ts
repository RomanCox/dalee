import {TStrapiMedia, TStrapiResponseArray} from "./strapi.type";

export interface IITem {
  id: number;
  description: string;
  media: TStrapiMedia;
}

interface ISection {
  id: number;
  title: string;
  item: IITem[];
}

interface ICategory {
  id: number;
  attributes: {
    title: string;
  }
}

interface ICategories {
  data: ICategory[];
}

interface ITeammate {
  id: number;
  attributes: {
    name: string;
    type: string;
    role: string;
  }
}

interface ITeammates {
  data: ITeammate[];
}

export type TProjectResponse = {
  title: string;
  area?: string;
  year?: string;
  image?: TStrapiMedia;
  location?: string;
  project_categories?: ICategories;
  status?: "Реализация" | "";
  customer?: string;
  empty?: boolean;
  onlyShowOnProjectsPage?: boolean;
  homePageOrder: number;
  projectsPageOrder: number;
  slug: string;
  sections: ISection[];
  teammates?: ITeammates;
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