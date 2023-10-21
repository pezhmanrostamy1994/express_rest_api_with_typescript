import { mongoObjectId } from "../types/mongoose";
import { IMongooseOptionsCollection, IPaginateData } from "../interfaces/db";
import { IRepo } from "./IRepo";
import { convertTextToMongoObjectSort } from "../utils/helper";

export abstract class MongoRepo implements IRepo {
  private _model: any;
  constructor(collection: any) {
    this._model = collection;
  }
  async findPaginate(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResultPaginate<Array<IRepo>>> {
    const page = +options.page || 1;
    const limit = +options.limit || 20;
    const { lean } = options;
    const sort = convertTextToMongoObjectSort(options.sort);
    const data: IPaginateData<IRepo[]> = await this._model.paginate(
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
    const result: IRepoResultPaginate<Array<IRepo>> = {
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
  ): Promise<IRepoResult<any[]>> {
    const find: any[] = await this._model
      .find(query)
      .populate(options.populate)
      .select(options.select);
    const result: IRepoResult<Array<any>> = {
      data: find,
    };
    return result;
  }
  async findOne(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<any>> {
    const findOne: any | null = await this._model
      .findOne(query)
      .select(options.select);
    const result: IRepoResult<any> = {
      data: findOne,
    };
    return result;
  }
  async findById(id: mongoObjectId | string): Promise<IRepoResult<any>> {
    const findById: any | null = await this._model.findById(id);
    const result: IRepoResult<any> = {
      data: findById,
    };
    return result;
  }
  async createOne(
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<any>> {
    const newSchema = new this._model(body);
    const newData = await newSchema.save();
    const result: IRepoResult<any> = {
      data: newData,
    };
    return result;
  }
  async updateOne(
    query: Object,
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<any>> {
    return await this._model.updateOne(query, body, options);
  }
}
