import React from "react";
import InputComponent from "../features/InputComponent.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../features/userSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import HandleChange from "../features/HandleChange.jsx";

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = (msg) =>
    toast.success(`${msg} Logged in Successfully!`, {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
      theme: "light",
    });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = HandleChange(setFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      getUser({ email: formData.email, password: formData.password }),
    );
    if (getUser.fulfilled.match(resultAction)) {
      notify(resultAction.payload.findUser.username);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error(
        "Login failed: " + (resultAction.payload || "Unknown error"),
        { position: "top-center", autoClose: 2000 },
      );
    }
  };
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Log In</legend>
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
        <button className="btn mt-4 bg-[#f5be91]" onClick={handleSubmit}>
          Login
        </button>
        <button className="btn bg-[#f5be91]">Guest User</button>
      </fieldset>

      <ToastContainer />
    </div>
  );
}
