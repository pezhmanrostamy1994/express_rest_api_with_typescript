import Joi from "joi";
import { STATUS } from "../utils/const";
export const statusEnum = Object.values(STATUS).map((status) => status.value);

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid(...statusEnum).required(),
  adminMessage: Joi.string().optional(),
});
