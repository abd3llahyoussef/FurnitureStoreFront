import { useState } from "react";
import InputComponent from "../features/InputComponent.jsx";
import { createUser } from "../features/userSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import HandleChange from "../features/HandleChange.jsx";

export default function Register() {
  const { user, isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (msg) =>
    toast.success(`${msg} Created Successfully!`, {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      theme: "light",
    });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = HandleChange(setFormData);

  const checkPasswordMatch = () => {
    return formData.password === formData.confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (!checkPasswordMatch()) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    const resultAction = await dispatch(
      createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    );
    if (isLoading === false && error === null) {
      notify(user.username);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error(
        "Register failed: " + (resultAction.payload || "Unknown error"),
        { position: "top-center", autoClose: 2000 },
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        <legend className="fieldset-legend">Register</legend>
        <InputComponent
          title="Username"
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputComponent
          title="Email"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputComponent
          title="Password"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputComponent
          title="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button className="btn  mt-4 bg-[#f5be91]" onClick={handleSubmit}>
          Register
        </button>
      </fieldset>
      <ToastContainer />
    </div>
  );
}
