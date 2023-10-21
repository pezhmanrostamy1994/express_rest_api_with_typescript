interface IRepoResult<T> {
  data?: T;
}
interface IServiceResult<T> {
  message?: string;
  data?: T;
}
interface IRepoResultPaginate<T> {
  data: T;
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  pagingCounter: number;
  nextPage: any;
  prevPage: any;
  hasPrevPage: any;
  hasNextPage: any;
}
interface IServiceResultPaginate<T> {
  data: T;
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
}
