import Joi from "joi";

export const loginSchema = Joi.object({
  emailOrMobile: Joi.string().min(3).max(40).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
export const registerSchema = Joi.object({
  mobile: Joi.string().min(3).max(12).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(40).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
