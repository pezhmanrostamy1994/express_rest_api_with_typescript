export interface IFilterBranch {
  name?: string;
  mobile?: string;
  status?: string;
}
export interface IBranchFactory {
  parsQueryDbForGetAllBranchs(query: IFilterBranch): Object;
}
