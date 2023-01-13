import React from "react";
import { Link } from "react-router-dom";
import { cls } from "../../libs/utils";

interface DetailVideoCardProps {
  videoWidth: "sm" | "lg";
}

const DetailVideoCard = ({ videoWidth }: DetailVideoCardProps) => {
  return (
    <Link to="/video/2">
      <div className="w-full mt-2 cursor-pointer transition-all flex space-x-2 hover:scale-105 hover:border hover:rounded-md">
        <div className="relative overflow-hidden">
          <div
            className={cls(
              "rounded-md shadow-sm bg-slate-300 aspect-video",
              videoWidth === "sm" ? "w-40" : "w-56"
            )}
          />
          <span className="absolute bottom-0.5 right-1 px-1 bg-black text-white text-xs">
            0:00
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <h3
            className={cls(
              "mb-0.5 font-bold text-white",
              videoWidth === "sm" ? "text-sm" : "text-base"
            )}
          >
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
  );
};

export default DetailVideoCard;
