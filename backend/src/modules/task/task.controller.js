import * as taskService from "./task.service.js";

import { taskResponse, tasksResponse } from "./task.dto.js";

import { createTaskSchema, updateTaskSchema } from "./task.validation.js";

import { ApiError } from "../../utils/ApiError.js";

import { ApiSuccessResponse } from "../../utils/apiSuccessResponse.js";

import { getPaginationMeta } from "../../utils/pagination.js";

import { getTasksByProjectService } from "./task.service.js";

//create Task
export const createTask = async (req, res, next) => {
  try {
    const { error } = createTaskSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message, "VALIDATION_ERROR");
    }

    const task = await taskService.createTaskService(req.body, req.user.id);

    return res
      .status(201)
      .json(
        ApiSuccessResponse(taskResponse(task), "Task created successfully"),
      );
  } catch (err) {
    next(err);
  }
};

//Get All Task
// export const getTasks = async (req, res, next) => {
//   try {
//     const tasks = await taskService.getTasksService(req.user);

//     return res
//       .status(200)
//       .json(
//         ApiSuccessResponse(tasksResponse(tasks), "Tasks fetched successfully"),
//       );
//   } catch (err) {
//     next(err);
//   }
// };
export const getTasks = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const result = await taskService.getTasksService(req.user, page, limit);

    return res.status(200).json(
      ApiSuccessResponse(
        {
          tasks: tasksResponse(result.tasks),

          pagination: getPaginationMeta(result.total, page, limit),
        },
        "Tasks fetched successfully",
      ),
    );
  } catch (err) {
    next(err);
  }
};

//Get Task  By ID
export const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskByIdService(req.params.id);

    return res
      .status(200)
      .json(
        ApiSuccessResponse(taskResponse(task), "Task fetched successfully"),
      );
  } catch (err) {
    next(err);
  }
};

//Update Task
export const updateTask = async (req, res, next) => {
  try {
    const { error } = updateTaskSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message, "VALIDATION_ERROR");
    }

    const task = await taskService.updateTaskService(req.params.id, req.body);

    return res
      .status(200)
      .json(
        ApiSuccessResponse(taskResponse(task), "Task updated successfully"),
      );
  } catch (err) {
    next(err);
  }
};

// UPDATE TASK STARUS
export const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatusService(
      req.params.id,
      req.body.status,
      req.user,
    );

    return res
      .status(200)
      .json(
        ApiSuccessResponse(
          taskResponse(task),
          "Task status updated successfully",
        ),
      );
  } catch (err) {
    next(err);
  }
};

//Delete Task
export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTaskService(req.params.id);

    return res
      .status(200)
      .json(ApiSuccessResponse(null, "Task deleted successfully"));
  } catch (err) {
    next(err);
  }
};

export const getTasksByProject = async (
  req,
  res,
  next,
) => {
  try {
    const { projectId } = req.params;

    const tasks =
      await getTasksByProjectService(projectId);

    return res.status(200).json(
      ApiSuccessResponse(
        tasksResponse(tasks),
        "Project tasks fetched successfully",
      ),
    );
  } catch (error) {
    next(error);
  }
};