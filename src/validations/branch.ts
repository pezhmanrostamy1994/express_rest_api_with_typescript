import Joi from "joi";
import { statusEnum } from "./base";

const baseSchema = {
  userMobile: Joi.string().required(),
  nikName: Joi.string().required(),
  expirationDate: Joi.string().isoDate().required(),
  registerDate: Joi.string().isoDate().required(),
  main: Joi.boolean().allow(null),
  location: Joi.object({
    long: Joi.number(),
    lat: Joi.number(),
  }),
  tags: Joi.array().items(Joi.string()).required(),
  city: Joi.string().required(),
  mobile: Joi.string().required(),
  mobile2: Joi.string(),
  faceBook: Joi.string().optional(),
  telegram: Joi.string().optional(),
  address: Joi.string().allow(null, ""),
  description: Joi.string(),
  status: Joi.string()
    .valid(...statusEnum)
    .required(),
  categories: Joi.array().required(),
};
export const createBranchSchema = Joi.object({
  name: Joi.string().required(),
  ...baseSchema,
});
export const updateBranchStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...statusEnum)
    .required(),
  branchCode: Joi.string().not().allow(),
});
export const updateBranchSchema = Joi.object(baseSchema);
