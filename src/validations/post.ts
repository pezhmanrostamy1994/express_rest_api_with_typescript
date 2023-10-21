import Joi from "joi";
import { statusEnum } from "./base";

const baseSchema = {
  name: Joi.string(),
  tags: Joi.array().items(Joi.string()).optional(),
  categories: Joi.array().required(),
  description: Joi.string().required(),
  city: Joi.string().required(),
  province: Joi.string().required(),
  price: Joi.number().optional(),
  images: Joi.array(),
  isShow: Joi.boolean().optional(),
  optionalInputs: Joi.array().optional(),
  status: Joi.string()
    .valid(...statusEnum)
    .optional(),
};
export const createPostSchema = Joi.object(baseSchema);
export const updatePostSchema = Joi.object(baseSchema);
