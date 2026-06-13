import Joi from "joi";

export const createDepartmentSchema =
  Joi.object({
    name: Joi.string().min(2).required(),

    description: Joi.string()
      .allow("")
      .optional(),
  });

export const updateDepartmentSchema =
  Joi.object({
    name: Joi.string().min(2),

    description: Joi.string().allow(""),
  });