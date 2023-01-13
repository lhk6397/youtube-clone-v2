import React from "react";
import { Link } from "react-router-dom";
import { IVideo } from "../pages/Home";

const HomeVideoCard = ({ video }: { video: IVideo }) => {
  const minutes = Math.floor(video.duration / 60);
  const seconds = Math.floor(video.duration - minutes * 60);
  return (
    <div className="mt-10 mx-20 cursor-pointer group transition-all hover:rounded-sm hover:scale-105 hover:shadow-md hover:shadow-slate-700 hover:bg-[#272727]">
      <Link to={`/video/${video._id}`}>
        <div className="relative">
          <img
            className="w-full rounded-md shadow-sm bg-slate-300 aspect-video group-hover:rounded-b-none"
            src={`http://localhost:5000/${video.thumbnail}`}
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
                {"조회수 " + video.views + "회 - "}
              </span>
              <span className="text-xs text-gray-400">1시간 전</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeVideoCard;
