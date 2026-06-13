import { useEffect, useState } from "react";

import {
  getProjects,
  createTask,
  updateTask,
} from "../api";

import {
  successToastMessage,
  failToastMessage,
} from "../../../utils/toasts";

const TaskModal = ({
  setOpenModal,
  refreshTasks,
  editTask,
  setEditTask,
}) => {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: editTask?.title || "",

    description:
      editTask?.description || "",

    project:
      editTask?.project?._id ||
      editTask?.project?.id ||
      "",

    assignedTo:
      editTask?.assignedTo?._id ||
      editTask?.assignedTo?.id ||
      "",

    priority:
      editTask?.priority || "medium",

    status:
      editTask?.status || "todo",

    dueDate:
      editTask?.dueDate?.split("T")[0] ||
      "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();

        setProjects(res.data.projects);
      } catch (err) {
        console.error(err);

        failToastMessage(
          "Failed to load projects"
        );
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTask) {
        await updateTask(
          editTask.id,
          formData
        );

        successToastMessage(
          "Task Updated Successfully"
        );
      } else {
        await createTask(formData);

        successToastMessage(
          "Task Created Successfully"
        );
      }

      await refreshTasks();

      setOpenModal(false);

      setEditTask(null);
    } catch (err) {
      console.error(
        err.response?.data || err
      );

      failToastMessage(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const selectedProject = projects.find(
    (project) =>
      project._id === formData.project ||
      project.id === formData.project
  );

  const availableUsers =
    selectedProject?.assignedUsers || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 bg-gray-900 border border-gray-700 rounded-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editTask
              ? "Edit Task"
              : "New Task"}
          </h2>

          <button
            onClick={() => {
              setOpenModal(false);
              setEditTask(null);
            }}
            className="text-gray-400"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
            />
          </div>

          {/* Project + Assigned User */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Project
              </label>

              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
                required
              >
                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Assigned User
              </label>

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              >
                <option value="">
                  Select User
                </option>

                {availableUsers.map(
                  (user) => (
                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.name}
                    </option>
                  )
                )}
              </select>
            </div>

          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              >
                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>
            </div>

          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => {
                setOpenModal(false);
                setEditTask(null);
              }}
              className="px-5 py-2 border border-gray-600 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 rounded-xl"
            >
              {editTask
                ? "Update"
                : "Create"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskModal;

// import { useEffect, useState } from "react";

// import { getProjects } from "../api";

// import { failToastMessage } from "../../../utils/toasts";

// const TaskModal = ({
//   setOpenModal,
//   editTask,
//   setEditTask,
// }) => {
//   const [projects, setProjects] = useState([]);

//   const [formData, setFormData] = useState({
//     title: editTask?.title || "",

//     description:
//       editTask?.description || "",

//     project:
//       editTask?.project?._id ||
//       editTask?.project?.id ||
//       "",

//     assignedTo:
//       editTask?.assignedTo?._id ||
//       editTask?.assignedTo?.id ||
//       "",

//     priority:
//       editTask?.priority || "medium",

//     status:
//       editTask?.status || "todo",

//     dueDate:
//       editTask?.dueDate?.split("T")[0] ||
//       "",
//   });

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await getProjects();

//         setProjects(res.data);
//       } catch (err) {
//         console.error(err);

//         failToastMessage(
//           "Failed to load projects"
//         );
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const selectedProject = projects.find(
//     (project) =>
//       project._id === formData.project ||
//       project.id === formData.project
//   );

//   const availableUsers =
//     selectedProject?.assignedUsers || [];

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="w-full max-w-2xl p-6 bg-gray-900 border border-gray-700 rounded-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold">
//             {editTask
//               ? "Edit Task"
//               : "New Task"}
//           </h2>

//           <button
//             onClick={() => {
//               setOpenModal(false);
//               setEditTask(null);
//             }}
//             className="text-gray-400"
//           >
//             ✕
//           </button>
//         </div>

//         <form className="space-y-5">
//           {/* Title */}
//           <div>
//             <label className="block mb-2 text-sm text-gray-400">
//               Task Title
//             </label>

//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block mb-2 text-sm text-gray-400">
//               Description
//             </label>

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
//             />
//           </div>

//           {/* Project + Assigned User */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2 text-sm text-gray-400">
//                 Project
//               </label>

//               <select
//                 name="project"
//                 value={formData.project}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
//               >
//                 <option value="">
//                   Select Project
//                 </option>

//                 {projects.map((project) => (
//                   <option
//                     key={project._id}
//                     value={project._id}
//                   >
//                     {project.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm text-gray-400">
//                 Assigned User
//               </label>

//               <select
//                 name="assignedTo"
//                 value={formData.assignedTo}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
//               >
//                 <option value="">
//                   Select User
//                 </option>

//                 {availableUsers.map(
//                   (user) => (
//                     <option
//                       key={user._id}
//                       value={user._id}
//                     >
//                       {user.name}
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>
//           </div>

//           {/* Priority + Status */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2 text-sm text-gray-400">
//                 Priority
//               </label>

//               <select
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
//               >
//                 <option value="low">
//                   Low
//                 </option>

//                 <option value="medium">
//                   Medium
//                 </option>

//                 <option value="high">
//                   High
//                 </option>
//               </select>
//             </div>

//             <div>
//               <label className="block mb-2 text-sm text-gray-400">
//                 Status
//               </label>

//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
//               >
//                 <option value="todo">
//                   Todo
//                 </option>

//                 <option value="in-progress">
//                   In Progress
//                 </option>

//                 <option value="completed">
//                   Completed
//                 </option>
//               </select>
//             </div>
//           </div>

//           {/* Due Date */}
//           <div>
//             <label className="block mb-2 text-sm text-gray-400">
//               Due Date
//             </label>

//             <input
//               type="date"
//               name="dueDate"
//               value={formData.dueDate}
//               onChange={handleChange}
//               className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4 pt-4">
//             <button
//               type="button"
//               onClick={() => {
//                 setOpenModal(false);
//                 setEditTask(null);
//               }}
//               className="px-5 py-2 border border-gray-600 rounded-xl"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-5 py-2 bg-blue-600 rounded-xl"
//             >
//               {editTask
//                 ? "Update"
//                 : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskModal;