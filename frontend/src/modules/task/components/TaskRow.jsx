import { updateTaskStatus } from "../api";
import { successToastMessage, failToastMessage } from "../../../utils/toasts";

import { useNavigate } from "react-router-dom";



const TaskRow = ({ task, onEdit, onDelete, refreshTasks }) => {
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  
  const priorityClasses = {
    low: "text-green-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  const statusClasses = {
    todo: "text-gray-300",
    "in-progress": "text-blue-400",
    completed: "text-green-400",
  };

  const handleStatusChange = async (e) => {
    try {
      await updateTaskStatus(task.id, e.target.value);

      successToastMessage("Task status updated");

      refreshTasks();
    } catch (err) {
      console.error(err.response?.data || err);

      failToastMessage("Failed to update status");
    }
  };

  return (
    <tr className="border-t border-gray-700">
      <td className="p-4 font-medium">{task.title}</td>

      <td className="p-4">{task.project?.name}</td>

      <td className="p-4">{task.assignedTo?.name}</td>

      <td className={`p-4 ${priorityClasses[task.priority]}`}>
        {task.priority}
      </td>

      <td className="p-4">
        {role === "admin" ? (
          <span className={statusClasses[task.status]}>{task.status}</span>
        ) : (
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="px-2 py-1 text-white bg-gray-800 border border-gray-600 rounded"
          >
            <option value="todo">Todo</option>

            <option value="in-progress">In Progress</option>

            <option value="completed">Completed</option>
          </select>
        )}
      </td>

      <td className="p-4">{new Date(task.dueDate).toLocaleDateString()}</td>

      <td className="p-4 space-x-3">
        <button
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="text-green-400 hover:underline"
        >
          View
        </button>

        {role === "admin" && (
          <>
            <button
              onClick={() => onEdit(task)}
              className="text-blue-400 hover:underline"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="text-red-400 hover:underline"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TaskRow;
