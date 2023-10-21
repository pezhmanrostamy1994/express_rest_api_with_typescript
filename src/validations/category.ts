import Joi from "joi";
import { statusEnum } from "./base";

const schema = Joi.object({
  name: Joi.string().min(3).max(12).required(),
  parents: Joi.array().required(),
  categoryType: Joi.string().required(),
  optionalInputs: Joi.array(),
  status: Joi.string().valid(...statusEnum),
  feilds: Joi.array(),
});
export const createCategorySchema = schema;
export const updateCategorySchema = schema;
