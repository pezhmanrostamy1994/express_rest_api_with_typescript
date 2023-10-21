import { isString } from "lodash";
import { IThrowError } from "../interfaces/error";

export const throwHttpError = ({ message, status }: IThrowError) => {
  const parsMessage = isString(message) ? [{ message }] : message;
  const errors: any = parsMessage;
  errors.statusCode = status;
  throw errors;
};
