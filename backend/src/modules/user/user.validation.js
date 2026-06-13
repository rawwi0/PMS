
import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one special character",
    }),

  role: Joi.string().valid("admin", "user"),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3),

  email: Joi.string().email(),

  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*])"))
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one special character",
    }),

  role: Joi.string().valid("admin", "user"),
});