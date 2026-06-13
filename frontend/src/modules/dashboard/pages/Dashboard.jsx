import { useEffect, useState } from "react";
import { getDashboardData } from "../api";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getDashboardData();

        setDashboard(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // const stats = [
  //   {
  //     title: "Total Projects",
  //     value: dashboard.stats.totalProjects,
  //     sub: "Projects",
  //   },
  //   {
  //     title: "Departments",
  //     value: dashboard.stats.totalDepartments,
  //     sub: "Active",
  //   },
  //   {
  //     title: "Team Members",
  //     value: dashboard.stats.totalUsers,
  //     sub: "Users",
  //   },
  //   {
  //     title: "Open Tasks",
  //     value: dashboard.stats.openTasks,
  //     sub: "Pending",
  //   },
  // ];

  const stats = [
    {
      title: "Total Projects",
      value: dashboard.stats.totalProjects,
      sub: `${dashboard.activeProjects.length} active projects`,
    },

    {
      title: "Departments",
      value: dashboard.stats.totalDepartments,
      sub: "Departments in company",
    },

    {
      title: "Team Members",
      value: dashboard.stats.totalUsers,
      sub: "Registered employees",
    },

    {
      title: "Open Tasks",
      value: dashboard.stats.openTasks,
      sub: "Tasks pending completion",
    },

    {
      title: "Total Tasks",
      value: dashboard.stats.totalTasks,
      sub: "Tasks in system",
    },

    {
      title: "Completed Tasks",
      value: dashboard.stats.completedTasks,
      sub: "Successfully finished",
    },
  ];
  return (
    <div>
      {/* Title */}
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((item, i) => (
          <div key={i} className="p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">{item.title}</p>

            <h2 className="text-xl font-bold">{item.value}</h2>

            <p className="text-xs text-gray-500">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Active Projects */}
      <div>
        <h2 className="mb-4 text-lg">Active Projects</h2>

        <div className="grid grid-cols-3 gap-4">
          {dashboard.activeProjects.map((p, i) => (
            <div key={i} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="font-semibold">{p.name}</h3>

              <p className="mb-2 text-xs text-gray-400">
                {p.department?.name || "No Department"}
              </p>

              <div className="h-2 bg-gray-700 rounded">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{
                    width: `${p.progress || 0}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">{p.progress || 0}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg">Recent Tasks</h2>

        <div className="overflow-hidden bg-gray-800 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Title</th>

                <th className="p-3 text-left">Project</th>

                <th className="p-3 text-left">Assigned To</th>

                <th className="p-3 text-left">Priority</th>

                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentTasks?.map((task) => (
                <tr
                  key={task._id || task.id}
                  className="border-b border-gray-700"
                >
                  <td className="p-3">{task.title}</td>

                  <td className="p-3">{task.project?.name || "-"}</td>

                  <td className="p-3">
                    {task.assignedTo?.name || "Unassigned"}
                  </td>

                  <td className="p-3">{task.priority}</td>

                  <td className="p-3">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
