export const taskResponse = (task) => ({
  id: task._id,

  title: task.title,

  description: task.description,

  status: task.status,

  priority: task.priority,

  dueDate: task.dueDate,

  project: task.project,

  assignedTo: task.assignedTo,

  createdBy: task.createdBy,

  createdAt: task.createdAt,

  updatedAt: task.updatedAt,
});

export const tasksResponse = (tasks) =>
  tasks.map(taskResponse);