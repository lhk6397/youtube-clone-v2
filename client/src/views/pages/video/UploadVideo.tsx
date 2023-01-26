import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosRequestConfig } from "axios";
import {
  Category,
  Private,
  VideoUploadForm,
} from "../../../assets/data/variable";
import { useSelector } from "react-redux";
import { RootState } from "../../../_store/store";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoUploadForm>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onValid = async (data: VideoUploadForm): Promise<void> => {
    if (
      data.title === "" ||
      data.description === "" ||
      data.category === "" ||
      filePath === ""
    ) {
      return alert("Please First Fill All The Fields");
    }

    const variable = {
      writer: user.userData._id,
      title: data.title,
      description: data.description,
      privacy: data.private,
      filePath,
      category: data.category,
      duration,
      thumbnail,
      fileName,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/video/uploadVideo`,
      variable
    );
    if (res.data.success) {
      alert("Video uploaded Successfully");
      navigate("/");
    } else {
      alert("Failed to upload video");
    }
  };

  const uploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (files) {
      const formData = new FormData();
      const config: AxiosRequestConfig = {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      };
      formData.append("file", files);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/video/uploadfiles`,
        formData,
        config
      );
      if (response.data.success) {
        setIsLoading(false);
        setFilePath(response.data.filePath);
        setFileName(response.data.fileName);
        setDuration(response.data.duration);
        setThumbnail(response.data.thumbnail);
      } else {
        alert("Failed to save the video in server");
      }
    }
  };

  return (
    <form
      className="px-4 py-16 space-y-3 sm:w-screen sm:max-w-[50vw] mx-auto"
      onSubmit={handleSubmit(onValid)}
    >
      {isLoading ? (
        <div className="text-center text-2xl font-bold p-20">Loading ...</div>
      ) : (
        <>
          {thumbnail !== "" ? (
            <div className="mb-5 flex flex-col items-center space-y-5">
              <h1 className="text-3xl font-bold">Thumbnail</h1>
              <img
                src={thumbnail}
                className="shadow-2xl border border-white border-dashed p-3"
                alt="thumbnail"
              />
            </div>
          ) : (
            <div className="mb-5">
              <label
                htmlFor="video"
                className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 py-6 h-48 rounded-md text-gray-600 hover:text-red-600 hover:border-red-600 cursor-pointer"
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
                id="video"
                className="hidden"
                type="file"
                accept="video/*"
                {...register("video", {
                  required: "Video is required",
                })}
                onChange={uploadFiles}
              />
            </div>
          )}
        </>
      )}
      <label htmlFor="title" className="mb-1 block text-sm font-medium">
        Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600 text-gray-700"
        {...register("title", {
          required: "Title is required",
        })}
      />
      <span className="text-xs text-red-300">{errors.title?.message}</span>
      <label className="mb-1 block text-sm font-medium">Description</label>
      <textarea
        rows={4}
        placeholder="Description"
        className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-600 focus:border-red-600 text-gray-700"
        {...register("description")}
      />
      <select
        id="private"
        className="block w-full rounded-md text-gray-700 px-2 py-2"
        {...register("private", {
          required: "Need to set disclosure scope",
        })}
      >
        {Private.map((item, i) => (
          <option key={i} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        id="category"
        className="block w-full rounded-md text-gray-700 px-2 py-2"
        {...register("category", {
          required: "Need to set category",
        })}
      >
        {Category.map((item, i) => (
          <option key={i} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>
      <button className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:outline-none">
        Upload product
      </button>
    </form>
  );
};

export default UploadVideo;
