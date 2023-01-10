import React from "react";
import { Link } from "react-router-dom";

const HomeVideoCard = () => {
  return (
    <div className="mt-10 mx-20 cursor-pointer group transition-all hover:rounded-sm hover:scale-105 hover:shadow-md hover:shadow-slate-700 hover:bg-[#272727]">
      <Link to="/video/1">
        <div className="relative overflow-hidden">
          <div className="w-80 rounded-md shadow-sm bg-slate-300 aspect-video group-hover:rounded-b-none" />
          <span className="absolute bottom-0.5 right-1 px-1 bg-black text-white text-xs">
            0:00
          </span>
        </div>
        <div className="mt-4 flex space-x-4">
          <div className="w-10 h-10 bg-gray-400 rounded-full" />
          <div className="flex flex-col space-y-0.5">
            <h3 className="text-sm mb-0.5 font-bold text-white ">
              테스트용 제목입니다
            </h3>
            <span className="text-xs text-gray-400">Black</span>
            <div className="flex space-x-1">
              <span className="text-xs text-gray-400">조회수 0회 - </span>
              <span className="text-xs text-gray-400">1시간 전</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeVideoCard;
