import { useEffect, useState, useCallback } from "react";

import { getProjects, deleteProject } from "../api";

import ProjectTable from "../components/ProjectTable";

import ProjectModal from "../components/ProjectModal";

import { deleteConfirmation } from "../../../utils/swal.js";

import { successToastMessage, failToastMessage } from "../../../utils/toasts";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  /* eslint-disable react-hooks/set-state-in-effect */
  const [editProject, setEditProject] = useState(null);

  const refreshProjects = useCallback(async () => {
    try {
      const res = await getProjects(page);

      setProjects(res.data.projects);

      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  // handle Edit
  const handleEdit = (project) => {
    setEditProject(project);
    setOpenModal(true);
  };

  // handle delete
  const handleDelete = async (id) => {
    const result = await deleteConfirmation(
      "Delete Project?",
      "This project will be permanently deleted",
    );

    if (!result.isConfirmed) return;

    try {
      await deleteProject(id);

      successToastMessage("Project deleted successfully");

      refreshProjects();
    } catch (err) {
      console.error(err.response?.data || err);

      failToastMessage("Failed to delete project");
    }
  };

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.status === activeTab);
      
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>

          <p className="mt-1 text-sm text-gray-400">Manage all projects</p>
        </div>

        <button
          onClick={() => {
            setEditProject(null);

            setOpenModal(true);
          }}
          className="px-5 py-2 border border-gray-600 rounded-xl hover:bg-gray-800"
        >
          + New Project
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-6 pb-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 ${
            activeTab === "all"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          All ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 ${
            activeTab === "pending"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Pending ({projects.filter((p) => p.status === "pending").length})
        </button>

        <button
          onClick={() => setActiveTab("ongoing")}
          className={`pb-2 ${
            activeTab === "ongoing"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Ongoing ({projects.filter((p) => p.status === "ongoing").length})
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-2 ${
            activeTab === "completed"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
        >
          Completed ({projects.filter((p) => p.status === "completed").length})
        </button>
      </div>

      {/* TABLE */}
      <ProjectTable
        projects={filteredProjects}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
        <ProjectModal
          setOpenModal={setOpenModal}
          refreshProjects={refreshProjects}
          editProject={editProject}
          setEditProject={setEditProject}
        />
      )}
    </div>
  );
};

export default Projects;
