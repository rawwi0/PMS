import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen text-white bg-gray-900">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />

        <div className="p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
