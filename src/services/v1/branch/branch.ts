import { ROLES, STATUS } from "../../../utils/const";
import { IBranch } from "../../../interfaces/branch";
import BranchRepo from "../../../repo/branch";
import { IReqUser } from "../../../interfaces/auth";
import { throwHttpError } from "../../../utils/error";
class BranchService {
  private branchRepo;
  constructor() {
    this.branchRepo = BranchRepo;
  }
  async myBrnachs(
    user: IReqUser,
    query: any
  ): Promise<IServiceResultPaginate<Array<IBranch>>> {
    query.userMobile = user.mobile;
    const data = await this.getAll(query);
    return data;
  }
  async search(query: any): Promise<IServiceResultPaginate<Array<IBranch>>> {
    const queryDb: any = { status: STATUS.ACTIVE.value };
    const name = query.name;
    if (name) {
      queryDb["$text"] = { $search: name };
    }

    const getAllBranch = await this.branchRepo.findPaginate(queryDb, {
      ...query,
      lean: true,
    });

    return getAllBranch;
  }
  async getAll(query: any): Promise<IServiceResultPaginate<Array<IBranch>>> {
    const queryDb: Object = this.parsQueryDbForGetAllBranchs(query);
    const getAllBranch = await this.branchRepo.findPaginate(queryDb, query);

    return getAllBranch;
  }
  async getAllWithoutPaginate(
    query: any
  ): Promise<IServiceResult<Array<IBranch>>> {
    const queryDb: Object = this.parsQueryDbForGetAllBranchs(query);
    const getAllBranch = await this.branchRepo.find(queryDb);
    return getAllBranch;
  }
  async getById(id: string): Promise<IServiceResult<IBranch>> {
    const getDataById = await this.branchRepo.findById(id);
    return getDataById;
  }
  async createOne(
    body: IBranch,
    userRole: string
  ): Promise<IServiceResult<IBranch>> {
    if (userRole !== ROLES.ADMIN.value) {
      body.status = STATUS.PENDING.value;
    }
    const findBranch: IRepoResult<IBranch | null> =
      await this.branchRepo.findOne({ name: body.name });

    if (findBranch.data) {
      return throwHttpError({
        message: "اطلاعات تکراری است",
      });
    }
    const newData: IRepoResult<IBranch> = await this.branchRepo.createOne(body);
    return newData;
  }
  async updateOne(
    id: string,
    body: IBranch,
    userRole: string
  ): Promise<IServiceResult<IBranch>> {
    if (userRole !== ROLES.ADMIN.value) {
      body.status = STATUS.PENDING.value;
    }

    /**
     * name is not allow to update
     */
    delete body.name;
    const updatedData: IRepoResult<IBranch> = await this.branchRepo.updateOne(
      { _id: id },
      body
    );

    return updatedData;
  }
  async updateBranchStatus(
    id: string,
    body: IBranch
  ): Promise<IServiceResult<IBranch>> {
    const updatedData: IRepoResult<IBranch> = await this.branchRepo.updateOne(
      { _id: id },
      body
    );

    return updatedData;
  }

  async updateBranchImages(body: any, user: IReqUser) {}
  parsQueryDbForGetAllBranchs(query: any) {
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

export default new BranchService();
