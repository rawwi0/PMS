import { useEffect, useState, useCallback } from "react";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api";

import Swal from "sweetalert2";

import { successToastMessage, failToastMessage } from "../../../utils/toasts";

import DepartmentTable from "../components/DepartmentTable";

import DepartmentModal from "../components/DepartmentModal";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  // FETCH
  const refreshDepartments = useCallback(async () => {
    try {
      const res = await getDepartments(page);

      setDepartments(res.data.departments);

      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    refreshDepartments();
  }, [refreshDepartments]);

  // CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateDepartment(editId, form);

        successToastMessage("Department updated successfully");
      } else {
        await createDepartment(form);

        successToastMessage("Department created successfully");
      }

      await refreshDepartments();

      setShowModal(false);

      setEditId(null);

      setForm({
        name: "",
        description: "",
      });
    } catch (err) {
      console.error(err);

      failToastMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This department will be deleted",

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
      await deleteDepartment(id);

      setDepartments((prev) => prev.filter((d) => d.id !== id));

      successToastMessage("Department deleted successfully");
    } catch (err) {
      console.error(err);

      failToastMessage(err.response?.data?.message || "Delete failed");
    }
  };

  // EDIT
  const handleEdit = (department) => {
    setForm({
      name: department.name,
      description: department.description,
    });

    setEditId(department.id);

    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>

          <p className="text-sm text-gray-400">Manage all departments</p>
        </div>

        <button
          onClick={() => {
            setForm({
              name: "",
              description: "",
            });

            setEditId(null);

            setShowModal(true);
          }}
          className="px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
        >
          + New Department
        </button>
      </div>

      {/* TABLE */}
      <DepartmentTable
        departments={departments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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

      {/* MODAL */}
      {showModal && (
        <DepartmentModal
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
          setEditId={setEditId}
          setForm={setForm}
          editId={editId}
        />
      )}
    </div>
  );
};

export default Departments;
