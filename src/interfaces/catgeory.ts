import { mongoObjectId } from "../types/mongoose";

export interface ICategoryModel {
  name: string;
  parents: Array<mongoObjectId>;
  status: string;
  paths: Array<string>;
  code: string;
  categoryType:string
}
export interface ICategory extends ICategoryModel {
  _id: mongoObjectId;
}
export interface ICategoryForCreate {
  name: string;
  parents: Array<mongoObjectId>;
  status: string;
}
export interface ICategoryForUpdate extends ICategoryForCreate {}
