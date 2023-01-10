import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Category = [
  { value: 0, label: "게임" },
  { value: 1, label: "음악" },
  { value: 2, label: "뷰티 / 팁" },
  { value: 3, label: "요리" },
  { value: 4, label: "스포츠" },
  { value: 5, label: "만화 영화" },
];

interface VideoUploadForm {
  video: any;
  title: string;
  description?: string;
  private: string;
  category: string;
}

// const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const target = e.currentTarget;
//   const files = (target.files as FileList)[0];
//   if (files) console.log(files);
//   const formData = new FormData();
//   const config = {
//     header: { "content-type": "multipart/form-data" },
//   };
//   formData.append("file", files);
//   //   axios.post("/api/video/uploadfiles", formData, config).then((response) => {
//   //     if (response.data.success) {
//   //       const variable = {
//   //         filePath: response.data.filePath,
//   //         fileName: response.data.fileName,
//   //       };
//   //       setFilePath(response.data.filePath);
//   //       //generate thumbnail with this filepath!
//   //       axios.post("/api/video/thumbnail", variable).then((response) => {
//   //         if (response.data.success) {
//   //           setDuration(response.data.fileDuration);
//   //           setThumbnail(response.data.thumbsFilePath);
//   //         } else {
//   //           alert("Failed to make the thumbnail");
//   //         }
//   //       });
//   //     } else {
//   //       alert("Failed to save the video in server");
//   //     }
//   //   });
// };

const UploadVideo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<VideoUploadForm>();

  const onValid = (data: VideoUploadForm) => {
    console.log(data);
  };

  if (errors.video?.message) {
    alert(errors.video.message);
  }

  return (
    <form className="px-4 py-16 space-y-3" onSubmit={handleSubmit(onValid)}>
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
          // onChange={uploadFiles}
        />
      </div>
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
