import { ProductModel } from "../database/models/product";
import { IMongooseOptionsCollection, IPaginateData } from "../interfaces/db";
import { mongoObjectId } from "../types/mongoose";
import { IProduct } from "../interfaces/product";
import { convertTextToMongoObjectSort } from "../utils/helper";
class ProductRepo {
  private Colection;
  constructor() {
    this.Colection = ProductModel;
  }
  async findPaginate(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResultPaginate<Array<IProduct>>> {
    const page = +options.page || 1;
    const limit = +options.limit || 20;
    const { lean } = options;
    const sort = convertTextToMongoObjectSort(options.sort);
    const data: IPaginateData<IProduct[]> = await this.Colection.paginate(
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
    const result: IRepoResultPaginate<Array<IProduct>> = {
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
  ): Promise<IRepoResult<IProduct[]>> {
    const find: IProduct[] = await this.Colection.find(query)
      .populate(options.populate)
      .select(options.select);
    const result: IRepoResult<Array<IProduct>> = {
      data: find,
    };
    return result;
  }
  async findOne(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<IProduct>> {
    const findOne: IProduct | null = await this.Colection.findOne(query).select(
      options.select
    );
    const result: IRepoResult<IProduct> = {
      data: findOne,
    };
    return result;
  }
  async findById(id: mongoObjectId | string): Promise<IRepoResult<IProduct>> {
    const findById: IProduct | null = await this.Colection.findById(id);
    const result: IRepoResult<IProduct> = {
      data: findById,
    };
    return result;
  }
  async createOne(
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<IProduct>> {
    const newSchema = new this.Colection(body);
    const newData = await newSchema.save();
    const result: IRepoResult<IProduct> = {
      data: newData,
    };
    return result;
  }
  async updateOne(
    query: Object,
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<IProduct>> {
    return await this.Colection.updateOne(query, body, options);
  }
}

export default new ProductRepo();
