import Project from "./project.model.js";
import { getPagination } from "../../utils/pagination.js";

export const createProjectRepo = async (payload) => {
  return await Project.create(payload);
};

export const getProjectsRepo = async (filters = {}, page, limit) => {
  const { skip, limit: pageLimit } = getPagination(page, limit);

  const [projects, total] = await Promise.all([
    Project.find(filters)
      .populate("department", "name")
      .populate("assignedUsers", "name email")
      .populate("createdBy", "name")
      .skip(skip)
      .limit(pageLimit),

    Project.countDocuments(filters),
  ]);

  return {
    projects,
    total,
  };
};

export const getProjectByIdRepo = async (id) => {
  return await Project.findById(id)
    .populate("department", "name")
    .populate("assignedUsers", "name email")
    .populate("createdBy", "name");
};

export const updateProjectRepo = async (id, payload) => {
  return await Project.findByIdAndUpdate(id, payload, { new: true })
    .populate("department", "name")
    .populate("assignedUsers", "name email")
    .populate("createdBy", "name");
};

export const deleteProjectRepo = async (id) => {
  return await Project.findByIdAndDelete(id);
};
