import User from "../user/user.model.js";
import Project from "../project/project.model.js";
import Department from "../department/department.model.js";
import Task from "../task/task.model.js";

export const getDashboardData = async () => {
  const totalUsers = await User.countDocuments();

  const totalProjects = await Project.countDocuments();

  const totalDepartments = await Department.countDocuments();

  const totalTasks = await Task.countDocuments();

  const openTasks = await Task.countDocuments({
    status: {
      $in: ["todo", "in-progress"], 
       // $IN :Find tasks whose status is todo OR in-progress
    },
  });

  const completedTasks = await Task.countDocuments({
    status: "completed",
  });

  const recentTasks = await Task.find()
    .populate("assignedTo", "name email")
    .populate("project", "name")
    .sort({
      createdAt: -1,
    })
    .limit(6);

  const activeProjects = await Project.find({
    status: "ongoing",
  })
    .populate("department")
    .limit(6);

  return {
  stats: {
    totalUsers,
    totalProjects,
    totalDepartments,
    totalTasks,
    openTasks,
    completedTasks,
  },

  activeProjects,

  recentTasks,
};
};

// import User from "../user/user.model.js";

// export const getDashboardData = async () => {
//   const totalUsers = await User.countDocuments();

//   return {
//     stats: {
//       totalUsers,
//       totalProjects: 0,
//       totalDepartments: 0,
//       openTasks: 0,
//     },
//     activeProjects: [],
//   };
// };
