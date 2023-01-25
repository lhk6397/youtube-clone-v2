import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IVideo } from "../../libs/interface";
import { cls, getTimegap } from "../../libs/utils";

interface DetailVideoCardProps {
  videoWidth: "sm" | "lg";
  video: IVideo;
}

const DetailVideoCard = ({ videoWidth, video }: DetailVideoCardProps) => {
  const { videoId } = useParams();
  const minutes = Math.floor(video.duration / 60);
  const seconds = Math.floor(video.duration - minutes * 60);
  const timegap = getTimegap(video.createdAt);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const videoId = video._id;
    const getViews = async () => {
      const res = await axios.post(
        "/api/view/getViews",
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
  }, [video]);

  return (
    <>
      {videoId !== video._id && (
        <Link to={`/video/${video._id}`}>
          <div className="w-full mt-2 cursor-pointer transition-all flex space-x-2 hover:scale-105 hover:border hover:rounded-md">
            <div className="relative overflow-hidden">
              <img
                src={video.thumbnail}
                alt="thumbnail"
                className={cls(
                  "rounded-md shadow-sm bg-slate-300 aspect-video",
                  videoWidth === "sm" ? "w-40" : "w-56"
                )}
              />
              <span className="absolute bottom-0.5 right-1 px-1 bg-black text-white text-xs">
                {minutes} : {seconds}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <h3
                className={cls(
                  "mb-0.5 font-bold text-white",
                  videoWidth === "sm" ? "text-sm" : "text-base"
                )}
              >
                {video.title}
              </h3>
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
      )}
    </>
  );
};

export default DetailVideoCard;
