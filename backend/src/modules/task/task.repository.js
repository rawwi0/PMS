import Task from "./task.model.js";
import { getPagination } from "../../utils/pagination.js";

export const createTaskRepo = async (payload) => {
  return await Task.create(payload);
};
//GET TASK REPO
// export const getTasksRepo = async () => {
//   return await Task.find()
//     .populate("project", "name")
//     .populate("assignedTo", "name email")
//     .populate("createdBy", "name email");
// };
// export const getMyTasksRepo = async (userId) => {
//   return await Task.find({
//     assignedTo: userId,
//   })
//     .populate("project", "name")
//     .populate("assignedTo", "name email")
//     .populate("createdBy", "name email");
// };

export const getTasksRepo = async (page, limit) => {
  const { skip, limit: pageLimit } = getPagination(page, limit);

  const [tasks, total] = await Promise.all([
    Task.find()
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(pageLimit),

    Task.countDocuments(),
  ]);

  return {
    tasks,
    total,
  };
};

export const getMyTasksRepo = async (userId, page, limit) => {
  const { skip, limit: pageLimit } = getPagination(page, limit);

  const [tasks, total] = await Promise.all([
    Task.find({
      assignedTo: userId,
    })
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(pageLimit),

    Task.countDocuments({
      assignedTo: userId,
    }),
  ]);

  return {
    tasks,
    total,
  };
};

export const getTaskByIdRepo = async (id) => {
  return await Task.findById(id)
    .populate("project", "name")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");
};

export const updateTaskRepo = async (id, payload) => {
  return await Task.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .populate("project", "name")
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");
};

export const deleteTaskRepo = async (id) => {
  return await Task.findByIdAndDelete(id);
};

export const getTasksByProjectRepository = async (
  projectId,
) => {
  return await Task.find({
    project: projectId,
  })
    .populate("assignedTo", "name email")
    .populate("project", "name");
};