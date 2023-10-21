import { ErrorRequestHandler } from "express";
import { IResponseError } from "../interfaces/error";

export const errorHandler: ErrorRequestHandler = (errors, req, res, next) => {
  console.log(errors);

  if (typeof errors.message === "string") {
    errors = [{ message: errors.message }];
  }
  const status = errors.statusCode || 500;
  const errorJson: IResponseError = { errors, success: false };

  res.status(status).json(errorJson);
};
