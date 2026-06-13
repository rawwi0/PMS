import { useEffect, useState, useCallback } from "react";
import { getUsersApi } from "../api";
import { createUserApi } from "../api";
import { deleteUserApi } from "../api";
import { updateUserApi } from "../api";
import Swal from "sweetalert2";
import { successToastMessage } from "../../../utils/toasts";

const Users = () => {
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editId, setEditId] = useState(null);

  const refreshUsers = useCallback(async () => {
    try {
      const res = await getUsersApi(page);

      setUsers(res.data.data.users);

      setPagination(res.data.data.pagination);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Name validation
    if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter valid email address";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must contain atleast 1 uppercase, 1 number, 1 special character and minimum 8 characters";
    }

    // If errors exist stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      if (editId) {
        await updateUserApi(editId, form);
        successToastMessage("User updated successfully");
      } else {
        await createUserApi(form);

        successToastMessage("User created successful");
      }

      setShowModal(false);
      setEditId(null);

      await refreshUsers();
    } catch (err) {
      const backendErrors = err.response?.data?.errorMessages;

      if (typeof backendErrors === "object") {
        setErrors(backendErrors);
      } else {
        Swal.fire({
          title: "Error",
          text: backendErrors || "Something went wrong",
          icon: "error",

          background: "#1f2937",
          color: "#fff",

          confirmButtonColor: "#ef4444",
        });
      }
    }
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted",
      icon: "warning",

      background: "#1f2937",
      color: "#fff",

      showCancelButton: true,

      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteUserApi(id);

      setUsers((prev) => prev.filter((u) => u.id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "User deleted successfully",
        icon: "success",

        background: "#1f2937",
        color: "#fff",

        confirmButtonColor: "#3b82f6",
      });
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Delete failed",
        icon: "error",

        background: "#1f2937",
        color: "#fff",

        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditId(user.id);
    setShowModal(true);
  };
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>

        <button
          onClick={() => {
            setForm({
              name: "",
              email: "",
              password: "",
              role: "user",
            });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-500 rounded"
        >
          + Add User
        </button>
      </div>

      <div className="overflow-hidden bg-gray-800 rounded">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-300 bg-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-700">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.role === "admin" ? "bg-purple-600" : "bg-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-3 space-x-2 text-right">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-gray-800 rounded w-96">
            <h2 className="mb-4 text-lg">
              {editId ? "Edit User" : "Add User"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                />

                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Email
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                />

                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">
                  Password
                </label>

                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                />

                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block mb-1 text-sm text-gray-300">Role</label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                {errors.role && (
                  <p className="text-sm text-red-400">{errors.role}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);

                    setEditId(null);

                    setForm({
                      name: "",
                      email: "",
                      password: "",
                      role: "user",
                    });
                  }}
                  className="px-3 py-1 bg-gray-600 rounded"
                >
                  Cancel
                </button>

                <button type="submit" className="px-3 py-1 bg-blue-500 rounded">
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
