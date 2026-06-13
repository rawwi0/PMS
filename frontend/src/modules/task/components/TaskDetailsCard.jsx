import { useNavigate } from "react-router-dom";

const TaskDetailsCard = ({ task }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/tasks")}
        className="px-4 py-2 transition bg-gray-700 rounded-lg hover:bg-gray-600"
      >
        ← Back to Tasks
      </button>

      {/* Hero */}
      <div className="p-6 border border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {task.title}
            </h1>

            <p className="mt-2 text-gray-400">
              {task.description}
            </p>
          </div>

          <div className="flex gap-2">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
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
              className={`px-3 py-1 text-sm rounded-full ${
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
          <p className="text-sm text-gray-400">
            Assigned User
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {task.assignedTo?.name || "N/A"}
          </h3>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
          <p className="text-sm text-gray-400">
            Due Date
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {new Date(
              task.dueDate,
            ).toLocaleDateString()}
          </h3>
        </div>

        <div className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
          <p className="text-sm text-gray-400">
            Project
          </p>

          <h3 className="mt-1 text-xl font-bold truncate">
            {task.project?.name}
          </h3>
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Task Overview */}
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
          <h2 className="mb-5 text-2xl font-semibold">
            Task Overview
          </h2>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-gray-400">
                Status
              </p>

              <p className="font-semibold">
                {task.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Priority
              </p>

              <p className="font-semibold">
                {task.priority}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Due Date
              </p>

              <p className="font-semibold">
                {new Date(
                  task.dueDate,
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Created
              </p>

              <p className="font-semibold">
                {new Date(
                  task.createdAt,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Assignment Info */}
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-2xl">
          <h2 className="mb-5 text-2xl font-semibold">
            Assignment Details
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">
                Assigned To
              </p>

              <p className="font-semibold">
                {task.assignedTo?.name ||
                  "Not Assigned"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Email
              </p>

              <p className="font-semibold">
                {task.assignedTo?.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Project
              </p>

              <p className="font-semibold">
                {task.project?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Created By
              </p>

              <p className="font-semibold">
                {task.createdBy?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsCard;