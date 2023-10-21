import { IMessage } from "../interfaces/message";
import { MessageModel } from "../database/models/messages";
import { IMongooseOptionsCollection, IPaginateData } from "../interfaces/db";
import { mongoObjectId } from "../types/mongoose";
import { convertTextToMongoObjectSort } from "../utils/helper";

class MessageRepo {
  private Colection;
  constructor() {
    this.Colection = MessageModel;
  }
  async findPaginate(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResultPaginate<Array<IMessage>>> {
    const page = +options.page || 1;
    const limit = +options.limit || 20;
    const { lean } = options;
    const sort = convertTextToMongoObjectSort(options.sort);
    const data: IPaginateData<IMessage[]> = await this.Colection.paginate(
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
    const result: IRepoResultPaginate<Array<IMessage>> = {
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
  ): Promise<IRepoResult<IMessage[]>> {
    const find: IMessage[] = await this.Colection.find(query)
      .populate(options.populate)
      .select(options.select);
    const result: IRepoResult<IMessage[]> = {
      data: find,
    };
    return result;
  }
  async findOne(
    query: object = {},
    options: IMongooseOptionsCollection = {}
  ): Promise<IRepoResult<IMessage>> {
    const findOne: IMessage | null = await this.Colection.findOne(query).select(
      options.select
    );
    const result: IRepoResult<IMessage> = {
      data: findOne,
    };
    return result;
  }
  async findById(
    id: mongoObjectId,
    options?: IMongooseOptionsCollection
  ): Promise<IRepoResult<IMessage>> {
    const findById: IMessage | null = await this.Colection.findById(
      id
    ).populate(options.populate);
    const result: IRepoResult<IMessage> = {
      data: findById,
    };
    return result;
  }
  async createOne(
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<IMessage>> {
    const newSchema = new this.Colection(body);
    const newData = await newSchema.save();
    const result: IRepoResult<IMessage> = {
      data: newData,
    };
    return result;
  }
  async updateOne(
    query: Object,
    body: Object,
    options: object = {}
  ): Promise<IRepoResult<IMessage>> {
    return await this.Colection.updateOne(query, body, options);
  }
  async updateMany(
    query: Object,
    body: Object,
    options?: object
  ): Promise<IRepoResult<IMessage>> {
    return await this.Colection.updateMany(query, body, options);
  }
}

export default new MessageRepo();
