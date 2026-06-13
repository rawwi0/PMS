const DepartmentModal = ({
  form,
  handleChange,
  handleSubmit,
  setShowModal,
  setEditId,
  setForm,
  editId,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md p-6 bg-gray-900 border border-gray-700 rounded-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editId ? "Edit Department" : "New Department"}
          </h2>

          <button
            onClick={() => {
              setShowModal(false);

              setEditId(null);

              setForm({
                name: "",
                description: "",
              });
            }}
            className="text-gray-400"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Department Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);

                setEditId(null);

                setForm({
                  name: "",
                  description: "",
                });
              }}
              className="px-4 py-2 border border-gray-600 rounded-lg"
            >
              Cancel
            </button>

            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg">
              {editId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentModal;

// import { useState } from "react";

// import { createDepartment, updateDepartment } from "../api";
// import { successToastMessage, failToastMessage } from "../../../utils/toasts";

// const DepartmentModal = ({
//   setOpenModal,
//   fetchDepartments,
//   editDepartment,
//   setEditDepartment,
// }) => {
//   const [formData, setFormData] = useState({
//     name: editDepartment?.name || "",

//     description: editDepartment?.description || "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editDepartment) {
//         await updateDepartment(editDepartment.id, formData);

//         successToastMessage("Department updated successfully");
//       } else {
//         await createDepartment(formData);

//         successToastMessage("Department created successfully");
//       }

//       await fetchDepartments();

//       setOpenModal(false);

//       setEditDepartment(null);
//     } catch (err) {
//       console.error(err);

//       failToastMessage(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="w-full max-w-md p-6 bg-gray-900 border border-gray-700 rounded-2xl">
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold">
//             {editDepartment ? "Edit Department" : "New Department"}
//           </h2>

//           <button
//             onClick={() => {
//               setOpenModal(false);

//               setEditDepartment(null);
//             }}
//             className="text-gray-400"
//           >
//             ✕
//           </button>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Department Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg"
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-lg"
//           />

//           {/* BUTTONS */}
//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={() => {
//                 setOpenModal(false);

//                 setEditDepartment(null);
//               }}
//               className="px-4 py-2 border border-gray-600 rounded-lg"
//             >
//               Cancel
//             </button>

//             <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg">
//               {editDepartment ? "Update" : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DepartmentModal;
