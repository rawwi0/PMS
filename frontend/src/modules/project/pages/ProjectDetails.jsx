import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProjectById } from "../api";
import ProjectDetailsCard from "../components/ProjectDetailsCard";

import { getTasksByProjectApi } from "../../task/api";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projectResponse = await getProjectById(id);
        setProject(projectResponse.data);

        const taskResponse = await getTasksByProjectApi(id);
        setTasks(taskResponse.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="p-6">
      <ProjectDetailsCard project={project} tasks={tasks} />
    </div>
  );
};

export default ProjectDetails;
