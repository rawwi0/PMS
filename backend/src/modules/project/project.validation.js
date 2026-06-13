import Joi from "joi";

export const createProjectSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Project name is required",
    "string.min": "Project name must be at least 3 characters",
  }),

  description: Joi.string().allow(""),

  department: Joi.string().required().messages({
    "string.empty": "Department is required",
  }),

  assignedUsers: Joi.array().items(Joi.string()),

  status: Joi.string()
    .valid("pending", "ongoing", "completed")
    .default("pending"),

  progress: Joi.number().min(0).max(100),

  startDate: Joi.date(),

  endDate: Joi.date(),
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(3),

  description: Joi.string().allow(""),

  department: Joi.string(),

  assignedUsers: Joi.array().items(Joi.string()),

  status: Joi.string().valid("pending", "ongoing", "completed"),

  progress: Joi.number().min(0).max(100),

  startDate: Joi.date(),

  endDate: Joi.date(),
}).min(1);
