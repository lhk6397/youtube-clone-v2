import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IVideo } from "../../libs/interface";
import { cls, getTimegap } from "../../libs/utils";

interface HomeVideoCardProps {
  videoWidth: "sm" | "lg";
  video: IVideo;
}

const HomeVideoCard = ({ video, videoWidth }: HomeVideoCardProps) => {
  const minutes = Math.floor(video.duration / 60);
  const seconds = Math.floor(video.duration - minutes * 60);
  const [views, setViews] = useState(0);
  useEffect(() => {
    const videoId = video._id;
    const getViews = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/view/getViews`,
        { videoId },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setViews(res.data.views.length);
      } else {
        alert("Failed to update view count");
      }
    };
    getViews();
  }, []);

  const timegap = getTimegap(video.createdAt);
  return (
    <div
      className={cls(
        "mt-10  cursor-pointer group transition-all hover:rounded-sm hover:scale-105 hover:shadow-md hover:shadow-slate-700 hover:bg-[#272727]",
        videoWidth === "lg" ? "mx-20 sm:mx-5" : "mx-5"
      )}
    >
      <Link to={`/video/${video._id}`}>
        <div className="relative">
          <img
            className="w-full rounded-md shadow-sm bg-slate-300 aspect-video group-hover:rounded-b-none"
            src={video.thumbnail}
            alt="thumbnail"
          />
          <span className="absolute bottom-[1px] right-0.5 px-1 bg-black text-white text-xs">
            {minutes} : {seconds}
          </span>
        </div>
        <div className="mt-4 flex space-x-4">
          <img
            src={video.writer.avatarUrl}
            alt="avatar"
            className="w-10 h-10 bg-gray-400 rounded-full"
          />
          <div className="flex flex-col space-y-0.5">
            <span className="text-sm mb-0.5 font-bold text-white ">
              {video.title}
            </span>
            <span className="text-xs text-gray-400">
              {video.writer.username}
            </span>
            <div className="flex space-x-1">
              <span className="text-xs text-gray-400">
                {views > 0 ? `조회수 ${views}회 - ` : "조회수 없음 - "}
              </span>
              <span className="text-xs text-gray-400">{timegap}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeVideoCard;
