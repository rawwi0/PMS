import TaskRow from "./TaskRow";

const TaskTable = ({
  tasks,
  onEdit,
  onDelete,
  refreshTasks,
}) => {
  const role =
    localStorage.getItem("role");

  return (
    <div className="overflow-auto border border-gray-700 rounded-2xl">
      <table className="w-full">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-4 text-left">
              TITLE
            </th>

            <th className="p-4 text-left">
              PROJECT
            </th>

            <th className="p-4 text-left">
              ASSIGNED TO
            </th>

            <th className="p-4 text-left">
              PRIORITY
            </th>

            <th className="p-4 text-left">
              STATUS
            </th>

            <th className="p-4 text-left">
              DUE DATE
            </th>

            {role === "admin" && (
              <th className="p-4 text-left">
                ACTIONS
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              refreshTasks={
                refreshTasks
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;

// import TaskRow from "./TaskRow";

// const TaskTable = ({
//   tasks,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <div className="overflow-hidden border border-gray-700 rounded-2xl">
//       <table className="w-full">
//         <thead className="bg-gray-800">
//           <tr>
//             <th className="p-4 text-left">
//               TITLE
//             </th>

//             <th className="p-4 text-left">
//               PROJECT
//             </th>

//             <th className="p-4 text-left">
//               ASSIGNED TO
//             </th>

//             <th className="p-4 text-left">
//               PRIORITY
//             </th>

//             <th className="p-4 text-left">
//               STATUS
//             </th>

//             <th className="p-4 text-left">
//               DUE DATE
//             </th>

//             <th className="p-4 text-left">
//               ACTIONS
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {tasks.map((task) => (
//             <TaskRow
//               key={task.id}
//               task={task}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TaskTable;