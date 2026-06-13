import Swal from "sweetalert2";

/**
 * DELETE CONFIRMATION
 */
const deleteConfirmation = async (
  title = "Are you sure?",
  text = "This item will be deleted",
) => {
  return await Swal.fire({
    title,
    text,
    icon: "warning",

    background: "#1f2937",
    color: "#fff",

    showCancelButton: true,

    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",

    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
  });
};

/**
 * SUCCESS ALERT
 */
const successAlert = async (
  title = "Success!",
  text = "Operation completed successfully",
) => {
  return await Swal.fire({
    title,
    text,
    icon: "success",

    background: "#1f2937",
    color: "#fff",

    confirmButtonColor: "#3b82f6",
  });
};

/**
 * ERROR ALERT
 */
const errorAlert = async (title = "Error!", text = "Something went wrong") => {
  return await Swal.fire({
    title,
    text,
    icon: "error",

    background: "#1f2937",
    color: "#fff",

    confirmButtonColor: "#ef4444",
  });
};

export { deleteConfirmation, successAlert, errorAlert };
