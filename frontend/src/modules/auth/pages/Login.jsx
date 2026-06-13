import { useState } from "react";
import { loginApi } from "../api";
import { useNavigate } from "react-router-dom";
import {successToastMessage, failToastMessage} from "../../../utils/toasts";


// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginApi(form);

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("role", res.data.data.user.role);

      successToastMessage("Login successful");

      console.log(res.data);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.log(err.response);

      failToastMessage(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">

      
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-800 rounded w-80"
      >
        <h2 className="mb-4 text-xl text-white">
          Login
        </h2>

        <div className="mb-3">
          <label className="block mb-1 text-sm text-gray-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-sm text-gray-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded"
          />
        </div>

        <button className="w-full p-2 bg-green-500 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
