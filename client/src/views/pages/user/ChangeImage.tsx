import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosRequestConfig } from "axios";
import { ProfileImageUploadForm } from "../../../assets/data/variable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../_store/store";
import { useNavigate } from "react-router-dom";
import { updateProfileImage } from "../../../_store/_slice/userSlice";

const ChangeImage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileImageUploadForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [filePath, setFilePath] = useState("");
  // const [thumbnail, setThumbnail] = useState("");

  const onValid = async (data: ProfileImageUploadForm): Promise<void> => {
    if (data.profileImage === "" || filePath === "") {
      return alert("Please Upload image");
    }

    const variable = {
      userId: user.userData._id,
      filePath,
    };

    const res = await dispatch(updateProfileImage(variable));
    console.log(res.payload);
    if (res.payload.success) {
      alert("Profile Image updated Successfully");
      navigate("/");
    } else {
      alert("Failed to update profile image");
    }
  };

  const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.currentTarget.files as FileList)[0];
    if (file) {
      const formData = new FormData();
      const config: AxiosRequestConfig = {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      };
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/api/user/uploadProfileImage",
        formData,
        config
      );

      if (response.data.success) {
        const variable = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        console.log(variable);
        setFilePath(response.data.filePath);
      } else {
        alert("Failed to save the profile image in server");
      }
    }
  };

  return (
    <div className="py-16 sm:w-screen sm:max-w-[50vw] mx-auto flex flex-col items-center justify-center space-y-16">
      <h1 className="text-3xl font-bold">Profile Image</h1>
      <form onSubmit={handleSubmit(onValid)} className="space-y-16">
        {filePath !== "" ? (
          <div className="mb-5 flex flex-col items-center space-y-5">
            <img
              src={`http://localhost:5000/${filePath}`}
              className="shadow-2xl border border-white border-dashed p-3 w-48 aspect-square rounded-full overflow-hidden"
              alt="filePath"
            />
          </div>
        ) : (
          <div>
            <label
              htmlFor="profileImage"
              className="w-48 mx-auto flex items-center justify-center border-2 border-dashed border-gray-300 aspect-square rounded-full text-gray-600 hover:text-red-600 hover:border-red-600 cursor-pointer"
            >
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
            <input
              id="profileImage"
              className="hidden"
              type="file"
              accept="image/*"
              {...register("profileImage", {
                required: "profileImage is required",
              })}
              onChange={uploadImages}
            />
          </div>
        )}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:outline-none">
          Upload product
        </button>
      </form>
    </div>
  );
};

export default ChangeImage;
