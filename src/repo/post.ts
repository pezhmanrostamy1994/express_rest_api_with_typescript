import { PostModel } from "../database/models/post";
import { IMongooseOptionsCollection, IPaginateData } from "../interfaces/db";
import { mongoObjectId } from "../types/mongoose";
import { IPost } from "../interfaces/post";
import { convertTextToMongoObjectSort } from "../utils/helper";
class ProductRepo {
  private Colection;
  constructor() {
    this.Colection = PostModel;
  }
  async findPaginate(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResultPaginate<Array<IPost>>> {
    const page = +options.page || 1;
    const limit = +options.limit || 20;
    const { lean } = options;
    const sort = convertTextToMongoObjectSort(options.sort);
    const data: IPaginateData<IPost[]> = await this.Colection.paginate(
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
    const result: IRepoResultPaginate<Array<IPost>> = {
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
  ): Promise<IRepoResult<IPost[]>> {
    const find: IPost[] = await this.Colection.find(query)
      .populate(options.populate)
      .select(options.select);
    const result: IRepoResult<Array<IPost>> = {
      data: find,
    };
    return result;
  }
  async findOne(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<IPost>> {
    const findOne: IPost | null = await this.Colection.findOne(query).select(
      options.select
    );
    const result: IRepoResult<IPost> = {
      data: findOne,
    };
    return result;
  }
  async findById(id: mongoObjectId | string): Promise<IRepoResult<IPost>> {
    const findById: IPost | null = await this.Colection.findById(id);
    const result: IRepoResult<IPost> = {
      data: findById,
    };
    return result;
  }
  async createOne(
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<IPost>> {
    const newSchema = new this.Colection(body);
    const newData = await newSchema.save();
    const result: IRepoResult<IPost> = {
      data: newData,
    };
    return result;
  }
  async updateOne(
    query: Object,
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<IPost>> {
    return await this.Colection.updateOne(query, body, options);
  }
  async findOneAndUpdate(
    query: Object,
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<IPost>> {
    const data: any = await this.Colection.findOneAndUpdate(
      query,
      body,
      options
    );

    return { data };
  }
}

export default new ProductRepo();
