import DepartmentRow from "./DepartmentRow";

const DepartmentTable = ({ departments, handleDelete, handleEdit }) => {
  return (
    <div className="overflow-auto border border-gray-700 rounded-xl">
      <table className="w-full text-left">
        <thead className="text-sm text-gray-300 uppercase bg-gray-800">
          <tr>
            <th className="p-4">Name</th>

            <th className="p-4">Description</th>

            <th className="p-4">Created</th>

            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((department) => (
            <DepartmentRow
              key={department.id}
              department={department}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;

// import DepartmentRow from "./DepartmentRow";

// const DepartmentTable = ({
//   departments,
//   fetchDepartments,
//   setEditDepartment,
//   setOpenModal,
// }) => {
//   return (
//     <div className="overflow-hidden border border-gray-700 rounded-xl">
//       <table className="w-full text-sm text-left">
//         <thead className="text-gray-400 uppercase bg-gray-800">
//           <tr>
//             <th className="px-6 py-4">
//               Name
//             </th>

//             <th className="px-6 py-4">
//               Description
//             </th>

//             <th className="px-6 py-4">
//               Created
//             </th>

//             <th className="px-6 py-4">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {departments.map((department) => (
//             <DepartmentRow
//               key={department.id}
//               department={department}
//               fetchDepartments={fetchDepartments}
//               setEditDepartment={setEditDepartment}
//               setOpenModal={setOpenModal}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DepartmentTable;
