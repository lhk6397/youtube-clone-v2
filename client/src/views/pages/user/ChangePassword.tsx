import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export interface ChangePasswordForm {
  curPassword: string;
  password: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ChangePasswordForm>();
  const onValid = async (data: ChangePasswordForm) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Password are not the same",
      });
    }

    const response = await axios.post(
      "/api/user/changePassword",
      { ...data, userId: localStorage.getItem("userId") },
      { withCredentials: true }
    );
    if (response.data.success) {
      navigate("/login");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="mt-16 px-4 flex flex-col items-center">
      <h3 className="text-3xl font-bold text-center">Change the password</h3>
      <div className="mt-8 sm:w-screen sm:max-w-[50vw]">
        <form
          className="flex flex-col mt-8 space-y-2 w-full"
          onSubmit={handleSubmit(onValid)}
        >
          <label
            htmlFor="curPassword"
            className="text-sm font-medium text-white"
          >
            Current Password
          </label>
          <div className="mt-1">
            <input
              id="curPassword"
              type="password"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600 text-gray-700"
              placeholder="Current Password"
              {...register("curPassword", {
                required: "Current Password is required",
                minLength: {
                  value: 6,
                  message: "Your Current password is too short",
                },
              })}
            />
          </div>
          <span className="text-xs text-red-300">
            {errors.curPassword?.message}
          </span>
          <label htmlFor="password" className="text-sm font-medium text-white">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600 text-gray-700"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Your password is too short",
                },
              })}
            />
          </div>
          <span className="text-xs text-red-300">
            {errors.password?.message}
          </span>
          <label htmlFor="password" className="text-sm font-medium text-white">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              type="password"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600 text-gray-700"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
          </div>
          <span className="text-xs text-red-300">
            {errors.confirmPassword?.message}
          </span>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-3 focus:ring-offset-2 focus:ring-red-600 focus:outline-none">
            Change the Password
          </button>
        </form>
        <div className="flex justify-start px-2 mt-2">
          <Link className="text-sm hover:text-red-600" to="/user/udpate">
            ← Undo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
