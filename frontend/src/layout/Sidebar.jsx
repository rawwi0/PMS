import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");

  const menu = [
    { name: "Dashboard", path: "/dashboard", roles: ["admin", "user"] },
    { name: "Users", path: "/users", roles: ["admin"] },
    { name: "Departments", path: "/departments", roles: ["admin"] },
    { name: "Projects", path: "/projects", roles: ["admin"] },
    {
      name: "Tasks",
      path: "/tasks",
      roles: ["admin", "user"],
    },
  ];
  // console.log("ROLE:", role);
  return (
    <div className="w-64 p-4 bg-gray-800">
      <h1 className="mb-6 text-xl font-bold">ProjectFlow</h1>

      {menu
        .filter((item) => item.roles.includes(role))
        .map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`block p-2 rounded mb-2 ${
              pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
    </div>
  );
};

export default Sidebar;
