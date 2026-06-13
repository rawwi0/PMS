import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",

    iconColor: "#ff7f7f",

    background: "#1f2937",
    color: "#fff",

    showCancelButton: true,

    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#3b82f6",
    cancelButtonColor: "#6b7280",
  });

  // if cancel clicked -> do nothing
  if (!result.isConfirmed) return;

  localStorage.removeItem("token");
  navigate("/");
};
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800">
      <input
        placeholder="Search..."
        className="px-3 py-1 bg-gray-700 rounded"
      />

      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-red-500 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;