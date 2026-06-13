import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../modules/auth/pages/Login";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import Users from "../modules/user/pages/Users";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";
import Departments from "../modules/department/pages/Departments";
import Projects from "../modules/project/pages/Projects";
import Tasks from "../modules/task/pages/Tasks";
import ProjectDetails from "../modules/project/pages/ProjectDetails";
import TaskDetails from "../modules/task/pages/TaskDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
