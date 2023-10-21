import { Response } from "express";

export const responseJson = (
  res: Response,
  result: any,
  status: number = 200
) => {
  const isPaginateData = result.hasOwnProperty("page");
  const message = result.message || "عملیات با موفقیت انجام شد";
  const jsonData = isPaginateData
    ? { ...result, success: true }
    : { data: result.data, success: true };
  jsonData.message = message;
  return res.status(status).json(jsonData);
};
