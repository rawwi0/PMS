import { useEffect, useState } from "react";

import { createProject, updateProject, getDepartments, getUsers } from "../api";

import { successToastMessage, failToastMessage } from "../../../utils/toasts";

const ProjectModal = ({
  setOpenModal,
  refreshProjects,
  editProject,
  setEditProject,
}) => {
  const [departments, setDepartments] = useState([]);

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: editProject?.name || "",
    description: editProject?.description || "",
    department: editProject?.department?._id || editProject?.department?.id || "",
    assignedUsers: editProject?.assignedUsers?.map((user) => user._id) || [],
    status: editProject?.status || "pending",
    progress: editProject?.progress || 0,
    startDate: editProject?.startDate?.split("T")[0] || "",
    endDate: editProject?.endDate?.split("T")[0] || "",
  });

  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptRes = await getDepartments();
        const userRes = await getUsers();

        setDepartments(deptRes.data.departments);
        setUsers(userRes.data.users);
      } catch (err) {
        console.error(err);
        failToastMessage("Failed to load modal data");
      }
    };
    fetchData();
  }, []);

  //imput change
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };
  //submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (editProject) {
        await updateProject(editProject._id, formData);

        successToastMessage("Project Updated Successfully");
      } else {
        await createProject(formData);
        successToastMessage("Project Created Successfully");
      }

      await refreshProjects();

      setOpenModal(false);
      setEditProject(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      failToastMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar p-6 bg-gray-900 border border-gray-700 rounded-2xl">
        {/*Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editProject ? "Edit Project" : "New Project"}
          </h2>

          <button
            onClick={() => {
              setOpenModal(false);
              setEditProject(null);
            }}
            className="text-gray-400"
          >
            ✕
          </button>
        </div>

        {/*Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/*Name*/}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
            />
          </div>

          {/*Description*/}

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-2xl"
            ></textarea>
          </div>

          {/* Row */}

          <div className="grid grid-cols-2 gap-4">
            {/* department */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status*/}

            <div>
              <label className="block mb-2 text-sm text-gray-400">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              >
                <option value="pending">Pending</option>

                <option value="ongoing">Ongoing</option>

                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Dates */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
              />
            </div>
          </div>

          {/* USERS */}
          {/* <div>
            <label className="block mb-2 text-sm text-gray-400 ">
              Assign Users
            </label>

            <select
              multiple
              value={formData.assignedUsers}
              onChange={handleUserSelect}
              className="w-full h-40 p-3 bg-gray-800 border border-gray-700 rounded-xl custom-scrollbar"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div> */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Assign Users
            </label>

            {/* Selected Users */}
            <div className="flex flex-wrap gap-2 mb-3">
              {users
                .filter((user) => formData.assignedUsers.includes(user.id))
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 rounded-full"
                  >
                    <span>{user.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          assignedUsers: prev.assignedUsers.filter(
                            (id) => id !== user.id,
                          ),
                        }))
                      }
                      className="hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>

            {/* Select Button */}
            <button
              type="button"
              onClick={() => setShowUsers(!showUsers)}
              className="w-full p-3 text-left bg-gray-800 border border-gray-700 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <span>
                  {formData.assignedUsers.length > 0
                    ? `${formData.assignedUsers.length} users selected`
                    : "Select Users"}
                </span>

                <span>{showUsers ? "−" : "+"}</span>
              </div>
            </button>

            {/* Dropdown */}
            {showUsers && (
              <div className="p-1 mt-2 overflow-y-auto bg-gray-800 border border-gray-700 rounded-xl max-h-40 custom-scrollbar">
                {users.filter(
                  (user) => !formData.assignedUsers.includes(user.id),
                ).length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-400">
                    All users selected
                  </div>
                )}

                {users
                  .filter((user) => !formData.assignedUsers.includes(user.id))
                  .map((user) => (
                    <div
                      key={user.id}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          assignedUsers: [...prev.assignedUsers, user.id],
                        }));
                      }}
                      className="px-3 py-2 text-sm transition rounded-lg cursor-pointer hover:bg-gray-700"
                    >
                      {user.name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* PROGRESS */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">Progress</label>

            <input
              type="number"
              name="progress"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setOpenModal(false);

                setEditProject(null);
              }}
              className="px-5 py-2 border border-gray-600 rounded-xl"
            >
              Cancel
            </button>

            <button type="submit" className="px-5 py-2 bg-blue-600 rounded-xl">
              {editProject ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProjectModal;
