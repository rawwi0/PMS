import { useEffect, useState, useCallback } from "react";

import { getTasks, deleteTask } from "../api";

import TaskTable from "../components/TaskTable";

import TaskModal from "../components/TaskModal";

import { deleteConfirmation } from "../../../utils/swal";

import { successToastMessage, failToastMessage } from "../../../utils/toasts";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  const role = localStorage.getItem("role");

  const [openModal, setOpenModal] = useState(false);

  const [editTask, setEditTask] = useState(null);
  /* eslint-disable react-hooks/set-state-in-effect */
  const refreshTasks = useCallback(async () => {
  try {
    const res = await getTasks(page);

    setTasks(res.data.tasks);
    setPagination(res.data.pagination);
  } catch (err) {
    console.error(err);
  }
}, [page]);

useEffect(() => {
  refreshTasks();
}, [refreshTasks]);

  const handleEdit = (task) => {
    setEditTask(task);

    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const result = await deleteConfirmation(
      "Delete Task?",
      "This task will be permanently deleted",
    );

    if (!result.isConfirmed) return;

    try {
      await deleteTask(id);

      successToastMessage("Task deleted successfully");

      refreshTasks();
    } catch (err) {
      console.error(err.response?.data || err);

      failToastMessage("Failed to delete task");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>

          <p className="mt-1 text-sm text-gray-400">Manage all tasks</p>
        </div>

        {role === "admin" && (
          <button
            onClick={() => {
              setEditTask(null);

              setOpenModal(true);
            }}
            className="px-5 py-2 border border-gray-600 rounded-xl hover:bg-gray-800"
          >
            + New Task
          </button>
        )}
      </div>

      <TaskTable
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        refreshTasks={refreshTasks}
      />

      {pagination && (
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {openModal && (
        <TaskModal
          setOpenModal={setOpenModal}
          refreshTasks={refreshTasks}
          editTask={editTask}
          setEditTask={setEditTask}
        />
      )}
    </div>
  );
};

export default Tasks;
