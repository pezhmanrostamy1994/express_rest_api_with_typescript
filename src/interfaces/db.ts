export interface IPopulateObj {
  path: string;
  select?: string;
  match?: Object;
}
export interface IPaginateData<T> {
  docs: T;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  nextPage: any;
  prevPage: any;
  hasPrevPage: any;
  hasNextPage: any;
}
export interface IMongooseOptionsCollection {
  populate?: string | Array<IPopulateObj>;
  select?: string;
  sort?: string;
  page?: number;
  limit?: number;
  lean?: boolean;
}

export interface ISort {
  [key: string]: number;
}
