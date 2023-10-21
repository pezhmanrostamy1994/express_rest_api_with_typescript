import { ROLES, STATUS } from "../../../utils/const";
import { IProduct } from "../../../interfaces/product";
import ProductRepo from "../../../repo/product";
import { IReqUser } from "../../../interfaces/auth";
import { throwHttpError } from "../../../utils/error";
import BranchRepo from "../../../repo/branch";
class ProductService {
  private productRepo;
  private branchRepo;
  constructor() {
    this.productRepo = ProductRepo;
    this.branchRepo = BranchRepo;
  }
  async search(query: any): Promise<IServiceResultPaginate<Array<IProduct>>> {
    const queryDb: any = { status: STATUS.ACTIVE.value };
    const { name, categories } = query;
    if (name) {
      queryDb["$text"] = { $search: name };
    }
    if (categories) {
      queryDb.categories = { $in: categories };
    }
    const getAllBranch = await this.productRepo.findPaginate(queryDb, {
      ...query,
      lean: true,
    });

    return getAllBranch;
  }
  async getAll(query: any): Promise<IServiceResultPaginate<Array<IProduct>>> {
    const queryDb: any = this.parsQueryDbForGetAllProduct(query);
    const getAllBranch = await this.productRepo.findPaginate(queryDb, query);

    return getAllBranch;
  }
  async getAllWithoutPaginate(
    query: any
  ): Promise<IServiceResult<Array<IProduct>>> {
    const queryDb: any = this.parsQueryDbForGetAllProduct(query);
    const getAllBranch = await this.productRepo.find(queryDb);
    return getAllBranch;
  }
  async getById(id: string): Promise<IServiceResult<IProduct>> {
    const getDataById = await this.productRepo.findById(id);
    return getDataById;
  }

  async createOne(
    body: IProduct,
    userRole: string
  ): Promise<IServiceResult<IProduct>> {
    if (userRole !== ROLES.ADMIN.value) {
      body.status = STATUS.PENDING.value;
    }
    const findBranchByCode = await this.branchRepo.findOne({
      branchCode: body.branchCode,
    });
    if (!findBranchByCode) {
      return throwHttpError({
        message: "branchCode is not exists",
        status: 404,
      });
    }
    const newData: IRepoResult<IProduct> = await this.productRepo.createOne(
      body
    );
    return newData;
  }
  async updateOne(
    id: string,
    body: IProduct,
    userRole: string
  ): Promise<IServiceResult<IProduct>> {
    if (userRole !== ROLES.ADMIN.value) {
      body.status = STATUS.PENDING.value;
    }

    const findBranchByCode = await this.branchRepo.findOne({
      branchCode: body.branchCode,
    });
    if (!findBranchByCode) {
      return throwHttpError({
        message: "branchCode is not exists",
        status: 404,
      });
    }
    const updatedData: IRepoResult<IProduct> = await this.productRepo.updateOne(
      { _id: id },
      body
    );
    return updatedData;
  }
  async updateProductStatus(
    id: string,
    body: IProduct
  ): Promise<IServiceResult<IProduct>> {
    const updatedData: IRepoResult<IProduct> = await this.productRepo.updateOne(
      { _id: id },
      body
    );
    return updatedData;
  }
  async updateImages(body: any, user: IReqUser) {}
  private parsQueryDbForGetAllProduct(query: any) {
    const queryDb: any = {};
    if (query.name) {
      queryDb.name = new RegExp(query.name);
    }
    if (query.status) {
      queryDb.status = query.status;
    }
    if (query.branchCode) {
      queryDb.branchCode = query.branchCode;
    }
    return queryDb;
  }
}

export default new ProductService();
