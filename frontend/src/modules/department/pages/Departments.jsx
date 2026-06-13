import { useEffect, useState, useCallback } from "react";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api";

import Swal from "sweetalert2";

import { successToastMessage, failToastMessage } from "../../../utils/toasts";

import DepartmentTable from "../components/DepartmentTable";

import DepartmentModal from "../components/DepartmentModal";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  // FETCH
  const refreshDepartments = useCallback(async () => {
    try {
      const res = await getDepartments(page);

      setDepartments(res.data.departments);

      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    refreshDepartments();
  }, [refreshDepartments]);

  // CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateDepartment(editId, form);

        successToastMessage("Department updated successfully");
      } else {
        await createDepartment(form);

        successToastMessage("Department created successfully");
      }

      await refreshDepartments();

      setShowModal(false);

      setEditId(null);

      setForm({
        name: "",
        description: "",
      });
    } catch (err) {
      console.error(err);

      failToastMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This department will be deleted",

      icon: "warning",

      background: "#1f2937",
      color: "#fff",

      showCancelButton: true,

      confirmButtonText: "Yes, delete it!",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#ef4444",

      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteDepartment(id);

      setDepartments((prev) => prev.filter((d) => d.id !== id));

      successToastMessage("Department deleted successfully");
    } catch (err) {
      console.error(err);

      failToastMessage(err.response?.data?.message || "Delete failed");
    }
  };

  // EDIT
  const handleEdit = (department) => {
    setForm({
      name: department.name,
      description: department.description,
    });

    setEditId(department.id);

    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>

          <p className="text-sm text-gray-400">Manage all departments</p>
        </div>

        <button
          onClick={() => {
            setForm({
              name: "",
              description: "",
            });

            setEditId(null);

            setShowModal(true);
          }}
          className="px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
        >
          + New Department
        </button>
      </div>

      {/* TABLE */}
      <DepartmentTable
        departments={departments}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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

      {/* MODAL */}
      {showModal && (
        <DepartmentModal
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
          setEditId={setEditId}
          setForm={setForm}
          editId={editId}
        />
      )}
    </div>
  );
};

export default Departments;

// import { useEffect, useState } from "react";




// import {
//   getDepartments,
//   createDepartment,
//   updateDepartment,
//   deleteDepartment,
// } from "../api";

// import Swal from "sweetalert2";

// import {
//   successToastMessage,
//   failToastMessage,
// } from "../../../utils/toasts";

// const Departments = () => {
//   const [departments, setDepartments] =
//     useState([]);

//   const [showModal, setShowModal] =
//     useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//   });

//   const [editId, setEditId] =
//     useState(null);

//   // FETCH DEPARTMENTS
//   useEffect(() => {
//     const fetchDepartments =
//       async () => {
//         try {
//           const res =
//             await getDepartments();

//           setDepartments(
//             res.data
//           );

//         } catch (err) {
//           console.error(
//             "Error fetching departments",
//             err
//           );
//         }
//       };

//     fetchDepartments();
//   }, []);

//   // HANDLE CHANGE
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   // HANDLE SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editId) {
//         await updateDepartment(
//           editId,
//           form
//         );

//         successToastMessage(
//           "Department updated successfully"
//         );

//       } else {
//         await createDepartment(
//           form
//         );

//         successToastMessage(
//           "Department created successfully"
//         );
//       }

//       setShowModal(false);

//       setEditId(null);

//       setForm({
//         name: "",
//         description: "",
//       });

//       const res =
//         await getDepartments();

//       setDepartments(
//         res.data
//       );

//     } catch (err) {
//       console.error(err);

//       failToastMessage(
//         err.response?.data?.message ||
//           "Something went wrong"
//       );
//     }
//   };

//   // DELETE
//   const handleDelete = async (id) => {
//     const result =
//       await Swal.fire({
//         title: "Are you sure?",
//         text:
//           "This department will be deleted",

//         icon: "warning",

//         background: "#1f2937",
//         color: "#fff",

//         showCancelButton: true,

//         confirmButtonText:
//           "Yes, delete it!",

//         cancelButtonText:
//           "Cancel",

//         confirmButtonColor:
//           "#ef4444",

//         cancelButtonColor:
//           "#6b7280",
//       });

//     if (!result.isConfirmed)
//       return;

//     try {
//       await deleteDepartment(id);

//       setDepartments((prev) =>
//         prev.filter(
//           (d) => d.id !== id
//         )
//       );

//       successToastMessage(
//         "Department deleted successfully"
//       );

//     } catch (err) {
//       console.error(err);

//       failToastMessage(
//         err.response?.data?.message ||
//           "Delete failed"
//       );
//     }
//   };

//   // EDIT
//   const handleEdit = (
//     department
//   ) => {
//     setForm({
//       name: department.name,
//       description:
//         department.description,
//     });

//     setEditId(department.id);

//     setShowModal(true);
//   };

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">
//           Departments
//         </h1>

//         <button
//           onClick={() => {
//             setForm({
//               name: "",
//               description: "",
//             });

//             setEditId(null);

//             setShowModal(true);
//           }}
//           className="px-4 py-2 bg-blue-500 rounded"
//         >
//           + Add Department
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-hidden bg-gray-800 rounded">
//         <table className="w-full text-left">
//           <thead className="text-sm text-gray-300 bg-gray-700">
//             <tr>
//               <th className="p-3">
//                 Name
//               </th>

//               <th className="p-3">
//                 Description
//               </th>

//               <th className="p-3 text-right">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {departments.map(
//               (department) => (
//                 <tr
//                   key={department.id}
//                   className="border-t border-gray-700"
//                 >
//                   <td className="p-3">
//                     {department.name}
//                   </td>

//                   <td className="p-3">
//                     {
//                       department.description
//                     }
//                   </td>

//                   <td className="p-3 space-x-2 text-right">
//                     <button
//                       onClick={() =>
//                         handleEdit(
//                           department
//                         )
//                       }
//                       className="text-blue-400"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() =>
//                         handleDelete(
//                           department.id
//                         )
//                       }
//                       className="text-red-400"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="p-6 bg-gray-800 rounded w-96">
//             <h2 className="mb-4 text-lg">
//               {editId
//                 ? "Edit Department"
//                 : "Add Department"}
//             </h2>

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-3"
//             >
//               {/* NAME */}
//               <div>
//                 <label className="block mb-1 text-sm text-gray-300">
//                   Name
//                 </label>

//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={
//                     handleChange
//                   }
//                   className="w-full p-2 bg-gray-700 rounded"
//                 />
//               </div>

//               {/* DESCRIPTION */}
//               <div>
//                 <label className="block mb-1 text-sm text-gray-300">
//                   Description
//                 </label>

//                 <textarea
//                   name="description"
//                   value={
//                     form.description
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   className="w-full p-2 bg-gray-700 rounded"
//                 />
//               </div>

//               {/* BUTTONS */}
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(
//                       false
//                     );

//                     setEditId(
//                       null
//                     );

//                     setForm({
//                       name: "",
//                       description:
//                         "",
//                     });
//                   }}
//                   className="px-3 py-1 bg-gray-600 rounded"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-3 py-1 bg-blue-500 rounded"
//                 >
//                   {editId
//                     ? "Update"
//                     : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Departments;
