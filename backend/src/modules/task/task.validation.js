import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),

  description: Joi.string().trim().required(),

  status: Joi.string()
    .valid("todo", "in-progress", "completed")
    .optional(),

  priority: Joi.string()
    .valid("low", "medium", "high")
    .optional(),

  dueDate: Joi.date().required(),

  project: Joi.string().required(),

  assignedTo: Joi.string().required(),
}); 

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(3),

  description: Joi.string().trim(),

  status: Joi.string().valid(
    "todo",
    "in-progress",
    "completed"
  ),

  priority: Joi.string().valid(
    "low",
    "medium",
    "high"
  ),

  dueDate: Joi.date(),

  project: Joi.string(),

  assignedTo: Joi.string(),
});

export const updateTaskStatusSchema =
  Joi.object({
    status: Joi.string()
      .valid(
        "todo",
        "in-progress",
        "completed"
      )
      .required(),
  });