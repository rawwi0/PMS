import * as projectRepo from "./project.repository.js";

import Department from "../department/department.model.js";
import User from "../user/user.model.js";

import { ApiError } from "../../utils/apiError.js";

const validateProjectRelations = async (body) => {
  // validate department
  if (body.department) {
    const department = await Department.findById(body.department);

    if (!department) {
      throw new ApiError(404, "Department not found");
    }
  }

  // validate assigned users
  if (body.assignedUsers?.length > 0) {
    for (const assignedUserId of body.assignedUsers) {
      const user = await User.findById(assignedUserId);

      if (!user) {
        throw new ApiError(404, "Assigned user not found");
      }
    }
  }

  // validate dates
  if (
    body.startDate &&
    body.endDate &&
    new Date(body.endDate) < new Date(body.startDate)
  ) {
    throw new ApiError(400, "End date cannot be before start date");
  }
};

export const createProjectService = async (body, userId) => {
  await validateProjectRelations(body);

  body.createdBy = userId;

  const created = await projectRepo.createProjectRepo(body);

  return await projectRepo.getProjectByIdRepo(created._id);
};

export const getProjectsService = async (query) => {
  const filters = {};

  if (query.status) {
    filters.status = query.status;
  }

  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  return await projectRepo.getProjectsRepo(filters, page, limit);
};

export const getProjectByIdService = async (id) => {
  const project = await projectRepo.getProjectByIdRepo(id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

export const updateProjectService = async (id, body) => {
  await validateProjectRelations(body);

  const updated = await projectRepo.updateProjectRepo(id, body);

  if (!updated) {
    throw new ApiError(404, "Project not found");
  }

  return updated;
};

export const deleteProjectService = async (id) => {
  const deleted = await projectRepo.deleteProjectRepo(id);

  if (!deleted) {
    throw new ApiError(404, "Project not found");
  }

  return deleted;
};
