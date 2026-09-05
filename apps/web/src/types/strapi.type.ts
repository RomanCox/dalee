export type TStrapiResponse<T> = {
  data: {
    id: number;
    attributes: T;
  };
};

type TStrapiEntity = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};

export type TStrapiSingleResponse<T> = { data: T & TStrapiEntity };

export type TStrapiResponseArray<T> = {
  data: {
    id: number;
    attributes: T;
  }[];
};

export type TStrapiCollectionResponse<T> = {
  data: Array<T & TStrapiEntity>;
};

export type TStrapiMedia = {
  data: {
    attributes: {
      height: number;
      width: number;
      url: string;
    };
  };
};

type TStrapiMediaFormat = {
  ext: string,
  hash: string,
  height: number,
  mime: string,
  name: string,
  path: string | null,
  size: number,
  sizeInBytes: number,
  url: string,
  width: number,
}

export type NewTStrapiMedia = {
  alternativeText: string | null,
  caption: string | null,
  createdAt: string,
  documentId: string,
  ext: string,
  formats: {
    thumbnail: TStrapiMediaFormat,
    small: TStrapiMediaFormat,
    medium: TStrapiMediaFormat,
    large: TStrapiMediaFormat
  }
  hash: string,
  height: number,
  id: number,
  mime: string,
  name: string,
  previewUrl: string | null,
  provider: string,
  provider_metadata: string | null,
  publishedAt: string,
  size: number,
  updatedAt: string,
  url: string,
  width: number,
};
