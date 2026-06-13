import { useNavigate } from "react-router-dom";
const ProjectRow = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    if (status === "completed") {
      return "bg-green-200 text-green-800";
    }

    if (status === "ongoing") {
      return "bg-blue-200 text-blue-800";
    }

    return "bg-yellow-200 text-yellow-800";
  };

  const getProgressColor = (status) => {
    if (status === "completed") {
      return "bg-green-500";
    }

    if (status === "ongoing") {
      return "bg-blue-500";
    }

    return "bg-yellow-500";
  };

  return (
    <tr className="border-t border-gray-700">
      {/* NAME */}
      <td className="px-6 py-5 font-semibold">{project.name}</td>

      {/* DEPARTMENT */}
      <td className="px-6 py-5 text-gray-300">{project.department?.name}</td>

      {/* USERS */}
      {/* <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 text-sm border border-gray-600 rounded-full">
            +{project.assignedUsers?.length}
          </div>
        </div>
      </td> */}
      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-2">
          {project.assignedUsers?.slice(0, 2).map((user) => (
            <span
              key={user._id}
              className="px-3 py-1 text-xs border border-gray-600 rounded-full"
            >
              {user.name}
            </span>
          ))}

          {project.assignedUsers?.length > 2 && (
            <span className="px-3 py-1 text-xs border border-gray-600 rounded-full">
              +{project.assignedUsers.length - 2}
            </span>
          )}
        </div>
      </td>

      {/* START */}
      <td className="px-6 py-5 text-gray-400">
        {project.startDate
          ? new Date(project.startDate).toLocaleDateString()
          : "-"}
      </td>

      {/* END */}
      <td className="px-6 py-5 text-gray-400">
        {project.endDate ? new Date(project.endDate).toLocaleDateString() : "-"}
      </td>

      {/* STATUS */}
      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
            project.status,
          )}`}
        >
          {project.status}
        </span>
      </td>

      {/* PROGRESS */}
      <td className="px-6 py-5 w-52">
        <div className="w-full h-2 bg-gray-700 rounded-full">
          <div
            className={`h-2 rounded-full ${getProgressColor(project.status)}`}
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>

        <p className="mt-2 text-sm text-gray-400">{project.progress}%</p>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-5">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/projects/${project._id}`)}
            className="px-3 py-1 text-sm bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            View
          </button>
          <button
            onClick={() => onEdit(project)}
            className="px-3 py-1 text-sm bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(project._id)}
            className="px-3 py-1 text-sm bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProjectRow;
