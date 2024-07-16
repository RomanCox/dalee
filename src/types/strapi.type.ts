export type TStrapiResponse<T> = {
  data: {
    id: number;
    attributes: T;
  };
};

export type TStrapiResponseArray<T> = {
  data: {
    id: number;
    attributes: T;
  }[];
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
