import { mongoObjectId } from "../types/mongoose";
import { IMongooseOptionsCollection } from "../interfaces/db";

export interface IRepo {
  findPaginate: (
    query?: object,
    options?: IMongooseOptionsCollection
  ) => Promise<IRepoResultPaginate<Array<any>>>;
  find: (query: object, options: IMongooseOptionsCollection) => {};
  findOne: (query: object, options: IMongooseOptionsCollection) => {};
  findById: (id: mongoObjectId | string) => {};
  createOne: (body: Object, options: object) => {};
  updateOne: (query: Object, body: Object, options: object) => {};
}
