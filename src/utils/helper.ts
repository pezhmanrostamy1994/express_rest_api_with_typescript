import { Types } from "mongoose";
import { ISort } from "../interfaces/db";
import { isString } from "lodash";
const convertToMongoObjectId = (str: string): Types.ObjectId => {
  return Types.ObjectId(str);
};
export const stringToMongoObjectId = (
  str: Array<string> | string
): Array<Types.ObjectId> | Types.ObjectId => {
  if (isString(str)) {
    return convertToMongoObjectId(str);
  } else {
    return str.map((item) => {
      return convertToMongoObjectId(item);
    });
  }
};
export const convertTextToMongoObjectSort = (sortTxt: string = ""): Object => {
  if (!sortTxt) return {};
  const sortObject: { [key: string]: number } = sortTxt
    .split(" ")
    .reduce((sort: ISort, field) => {
      const sortOrder: number = field.startsWith("-") ? -1 : 1;
      const fieldName: string = field.replace("-", "");
      sort[fieldName] = sortOrder;
      return sort;
    }, {});
  return sortObject;
};
