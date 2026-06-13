import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const ProjectDetailsCard = ({ project, tasks }) => {
  const navigate = useNavigate();

  const completedTasks = useMemo(
    () =>
      tasks?.filter(
        (task) => task.status === "completed",
      ).length || 0,
    [tasks],
  );

  return (
    <div className="space-y-5 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/projects")}
        className="px-4 py-2 transition bg-gray-700 rounded-lg hover:bg-gray-600"
      >
        ← Back to Projects
      </button>

      {/* Hero Section */}
      <div className="p-6 border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {project.name}
            </h1>

            <p className="mt-2 text-gray-400">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-500/20">
              {project.status}
            </span>

            <span className="px-3 py-1 text-sm text-green-400 rounded-full bg-green-500/20">
              {project.progress}% Complete
            </span>

            <span className="px-3 py-1 text-sm text-purple-400 rounded-full bg-purple-500/20">
              {project.department?.name}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full h-3 bg-gray-700 rounded-full">
            <div
              className="h-3 bg-blue-500 rounded-full"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
          <p className="text-sm text-gray-400">
            Assigned Users
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {project.assignedUsers?.length || 0}
          </h3>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
          <p className="text-sm text-gray-400">
            Total Tasks
          </p>

          <h3 className="mt-1 text-3xl font-bold">
            {tasks?.length || 0}
          </h3>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
          <p className="text-sm text-gray-400">
            Completed Tasks
          </p>

          <h3 className="mt-1 text-3xl font-bold text-green-400">
            {completedTasks}
          </h3>
        </div>
      </div>

      {/* Overview + Users */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Project Info */}
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
          <h2 className="mb-5 text-2xl font-semibold">
            Project Overview
          </h2>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-gray-400">
                Department
              </p>

              <p className="font-semibold">
                {project.department?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Created By
              </p>

              <p className="font-semibold">
                {project.createdBy?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Start Date
              </p>

              <p className="font-semibold">
                {new Date(
                  project.startDate,
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                End Date
              </p>

              <p className="font-semibold">
                {new Date(
                  project.endDate,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Assigned Users */}
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
          <h2 className="mb-5 text-2xl font-semibold">
            Assigned Users
          </h2>

          <div className="space-y-3">
            {project.assignedUsers?.length > 0 ? (
              project.assignedUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-3 border border-gray-700 rounded-xl"
                >
                  <div className="flex items-center justify-center w-10 h-10 font-bold bg-blue-600 rounded-full">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium">
                      {user.name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No users assigned
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Related Tasks */}
      <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
        <h2 className="mb-5 text-2xl font-semibold">
          Related Tasks
        </h2>

        {tasks?.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() =>
                  navigate(`/tasks/${task.id}`)
                }
                className="flex items-center justify-between p-4 transition border border-gray-700 cursor-pointer rounded-xl hover:border-blue-500 hover:bg-gray-700/40"
              >
                <div>
                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Assigned:{" "}
                    {task.assignedTo?.name ||
                      "Not Assigned"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      task.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : task.status === "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsCard;