import { IBranchFactory, IFilterBranch } from "./IBranchFactory";

export abstract class BranchFactory implements IBranchFactory{
  public parsQueryDbForGetAllBranchs(query: IFilterBranch): object {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.mobile) {
      queryDb.mobile = new RegExp(query.mobile);
    }
    if (query.status) {
      queryDb.status = query.status;
    }
    return queryDb;
  }
}
