import * as taskRepo from "./task.repository.js";
import Project from "../project/project.model.js";
import User from "../user/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { getTasksByProjectRepository } from "./task.repository.js";

//CREATE TASK SERVICE
export const createTaskService = async (body, userId) => {
  const project = await Project.findById(body.project);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const assignedUser = await User.findById(body.assignedTo);

  if (!assignedUser) {
    throw new ApiError(404, "Assigned user not found");
  }

  const isUserAssignedToProject = project.assignedUsers.some(
    (user) => user.toString() === body.assignedTo,
  );

  if (!isUserAssignedToProject) {
    throw new ApiError(400, "User is not assigned to this project");
  }

  return await taskRepo.createTaskRepo({
    ...body,
    createdBy: userId,
  });
};

//GET TASK SERVICE
export const getTasksService = async (user, page, limit) => {
  if (user.role === "admin") {
    return await taskRepo.getTasksRepo(page, limit);
  }

  return await taskRepo.getMyTasksRepo(user.id, page, limit);
};

//GET TASK BY ID
export const getTaskByIdService = async (id) => {
  const task = await taskRepo.getTaskByIdRepo(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return task;
};

//UPDATE TASK SERVICE
export const updateTaskService = async (id, body) => {
  const task = await taskRepo.getTaskByIdRepo(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return await taskRepo.updateTaskRepo(id, body);
};

//UPDATE TASK STATUS
export const updateTaskStatusService = async (taskId, status, user) => {
  const task = await taskRepo.getTaskByIdRepo(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // Admin can update any task status
  if (user.role === "admin") {
    return await taskRepo.updateTaskRepo(taskId, { status });
  }

  // User can update only their own task
  if (!task.assignedTo || task.assignedTo._id.toString() !== user.id) {
    throw new ApiError(403, "You can only update your assigned tasks");
  }

  return await taskRepo.updateTaskRepo(taskId, { status });
};

//DELETE TASK
export const deleteTaskService = async (id) => {
  const task = await taskRepo.getTaskByIdRepo(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return await taskRepo.deleteTaskRepo(id);
};

export const getTasksByProjectService = async (
  projectId,
) => {
  const project =
    await Project.findById(projectId);

  if (!project) {
    throw new ApiError(
      404,
      "Project not found",
    );
  }

  return await getTasksByProjectRepository(
    projectId,
  );
};