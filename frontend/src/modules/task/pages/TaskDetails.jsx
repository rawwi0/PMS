import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTask } from "../api";

import TaskDetailsCard from "../components/TaskDetailsCard";

const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const response = await getTask(id);

        setTask(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <TaskDetailsCard task={task} />
    </div>
  );
};

export default TaskDetails;