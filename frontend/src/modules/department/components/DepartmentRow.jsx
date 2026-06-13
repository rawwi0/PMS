import { capitalizeWords } from "../../../utils/formatters";

const DepartmentRow = ({ department, handleDelete, handleEdit }) => {
  return (
    <tr className="border-t border-gray-700">
      <td className="p-4 font-semibold">{capitalizeWords(department.name)}</td>

      <td className="p-4 text-gray-400">
        {capitalizeWords(department.description)}
      </td>

      <td className="p-4 text-gray-400">
        {new Date(department.createdAt).toLocaleDateString()}
      </td>

      <td className="p-4 space-x-3 text-right">
        <button
          onClick={() => handleEdit(department)}
          className="text-blue-400"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(department.id)}
          className="text-red-400"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DepartmentRow;

// import { deleteDepartment } from "../api";
// import { successToastMessage, failToastMessage } from "../../../utils/toasts.js"

// import { deleteConfirmation, errorAlert } from "../../../utils/swal.js";

// const DepartmentRow = ({
//   department,
//   fetchDepartments,
//   setEditDepartment,
//   setOpenModal,
// }) => {
//   const handleDelete = async () => {
//     const result = await deleteConfirmation(
//       "Are you sure?",
//       "This department will be deleted",
//     );

//     if (!result.isConfirmed) return;

//     try {
//       await deleteDepartment(department.id);

//       successToastMessage("Department deleted successfully");

//       fetchDepartments();
//     } catch (err) {
//       console.error(err);

//       failToastMessage("Delete failed");

//       await errorAlert(
//         "Error!",
//         err.response?.data?.message || "Delete failed",
//       );
//     }
//   };

//   const handleEdit = () => {
//     setEditDepartment(department);

//     setOpenModal(true);
//   };

//   return (
//     <tr className="border-t border-gray-700">
//       <td className="px-6 py-4 font-semibold">{department.name}</td>

//       <td className="px-6 py-4 text-gray-400">{department.description}</td>

//       <td className="px-6 py-4 text-gray-400">
//         {new Date(department.createdAt).toLocaleDateString()}
//       </td>

//       <td className="px-6 py-4 space-x-4">
//         <button
//           onClick={handleEdit}
//           className="text-blue-400 hover:text-blue-300"
//         >
//           Edit
//         </button>

//         <button
//           onClick={handleDelete}
//           className="text-red-400 hover:text-red-300"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default DepartmentRow;
