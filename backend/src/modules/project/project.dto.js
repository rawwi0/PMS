export const projectResponse = (project) => ({
  id: project._id,

  name: project.name,

  description: project.description,

  department: project.department,

  assignedUsers: project.assignedUsers,

  status: project.status,

  progress: project.progress,

  startDate: project.startDate,

  endDate: project.endDate,

  createdBy: project.createdBy,

  createdAt: project.createdAt,

  updatedAt: project.updatedAt,
});