import { ICategory } from "../interfaces/catgeory";
import { CategroyModel } from "../database/models/category";
import { IMongooseOptionsCollection, IPaginateData } from "../interfaces/db";
import { mongoObjectId } from ".././types/mongoose";

class CategoryRepo {
  private Colection;
  constructor() {
    this.Colection = CategroyModel;
  }
  async findPaginate(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResultPaginate<Array<ICategory>>> {
    const page = +options.page || 1;
    const limit = +options.limit || 20;

    const data: IPaginateData<ICategory[]> = await this.Colection.paginate(
      query,
      {
        page,
        limit,
        populate: options.populate || [],
        select: options.select,
      }
    );
    const { totalDocs, totalPages, pagingCounter } = data;
    const result: IRepoResultPaginate<Array<ICategory>> = {
      data: data.docs,
      page,
      limit,
      totalDocs,
      totalPages,
      pagingCounter,
      nextPage: undefined,
      prevPage: undefined,
      hasPrevPage: undefined,
      hasNextPage: undefined
    };
    return result;
  }
  async find(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<ICategory[]>> {
    const find: ICategory[] = await this.Colection.find(query)
      .populate(options.populate)
      .select(options.select);
    const result: IRepoResult<ICategory[]> = {
      data: find,
    };
    return result;
  }
  async findOne(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<ICategory>> {
    const findOne: ICategory | null = await this.Colection.findOne(
      query
    ).select(options.select);
    const result: IRepoResult<ICategory> = {
      data: findOne,
    };
    return result;
  }
  async findById(
    id: mongoObjectId,
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<ICategory>> {
    const findById: ICategory | null = await this.Colection.findById(
      id
    ).populate(options.populate);
    const result: IRepoResult<ICategory> = {
      data: findById,
    };
    return result;
  }
  async createOne(
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<ICategory>> {
    const newSchema = new this.Colection(body);
    const newData = await newSchema.save();
    const result: IRepoResult<ICategory> = {
      data: newData,
    };
    return result;
  }
  async updateOne(
    query: Object,
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<ICategory>> {
    return await this.Colection.updateOne(query, body, options);
  }
}

export default new CategoryRepo();
