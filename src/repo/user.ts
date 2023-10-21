import { IUser } from "../interfaces/user";
import { UserModel } from "../database/models/user";
import { IMongooseOptionsCollection, IPaginateData } from "../interfaces/db";
import { convertTextToMongoObjectSort } from "../utils/helper";

class UserRepo {
  private Colection;
  constructor() {
    this.Colection = UserModel;
  }
  async findPaginate(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResultPaginate<Array<IUser>>> {
    const page = +options.page || 1;
    const limit = +options.limit || 20;
    const { lean } = options;
    const sort = convertTextToMongoObjectSort(options.sort);
    const data: IPaginateData<IUser[]> = await this.Colection.paginate(
      { ...query },
      {
        page,
        limit,
        populate: options.populate || [],
        select: options.select,
        sort,
        lean,
      }
    );

    const {
      totalDocs,
      totalPages,
      pagingCounter,
      nextPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
    } = data;
    const result: IRepoResultPaginate<Array<IUser>> = {
      data: data.docs,
      page,
      limit,
      totalDocs,
      totalPages,
      pagingCounter,
      nextPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
    };
    return result;
  }
  async find(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<IUser[]>> {
    const find: IUser[] = await this.Colection.find(query)
      .populate(options.populate)
      .select(options.select);
    const result: IRepoResult<IUser[]> = {
      data: find,
    };
    return result;
  }
  async findOne(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<IUser>> {
    const findOne: IUser | null = await this.Colection.findOne(query).select(
      options.select || ""
    );
    const result: IRepoResult<IUser> = {
      data: findOne,
    };
    return result;
  }
  async findById(id: string): Promise<IRepoResult<IUser>> {
    const findById: IUser | null = await this.Colection.findById(id);
    const result: IRepoResult<IUser> = {
      data: findById,
    };
    return result;
  }
  async createOne(
    user: IUser,
    options: object = {}
  ): Promise<IRepoResult<IUser>> {
    const newSchema = new this.Colection(user);
    const newData = await newSchema.save();
    const result: IRepoResult<IUser> = {
      data: newData,
    };
    return result;
  }
}

export default new UserRepo();
