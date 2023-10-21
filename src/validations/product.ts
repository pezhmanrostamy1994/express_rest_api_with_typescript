import Joi from "joi";
import { statusEnum } from "./base";

const baseSchema = {
  name: Joi.string(),
  price: Joi.number().allow(null),
  inventory: Joi.number().allow(null),
  tags: Joi.array().items(Joi.string()).required(),
  categories: Joi.array().required(),
  status: Joi.string()
    .valid(...statusEnum)
    .required(),
  branchCode: Joi.string().required(),
};
export const createProductSchema = Joi.object(baseSchema);
export const updateBranchStatusSchema = Joi.object(baseSchema);
export const updateProductSchema = Joi.object(baseSchema);
