import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cls } from "../../../libs/utils";
import { RootState } from "../../../_store/store";
import Comment from "../../components/Comment";
import DetailVideoCard from "../../components/DetailVideoCard";
import LikeDislikes from "../../components/LikeDislikes";
import Subscriber from "../../components/Subscriber";
import { IVideo } from "../Home";

const DetailVideo = () => {
  const { videoId } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [views, setViews] = useState(0);
  const [video, setVideo] = useState<IVideo>();
  const [recommended, setRecommended] = useState<IVideo[]>([]);
  const [isPOpen, setIsPOpen] = useState(false);

  const userId = user?.userData?._id;

  useEffect(() => {
    const updateViews = async () => {
      const viewRes = await axios.post(
        "http://localhost:5000/api/view/updateView",
        { videoId, userId },
        { withCredentials: true }
      );
      if (viewRes.data.success) {
        setViews(viewRes.data.views.length);
      } else {
        alert("Failed to update view count");
      }
    };

    const getVideo = async () => {
      const res = await axios.post(
        "http://localhost:5000/api/video/getVideo",
        { videoId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setVideo(res.data.video);
      } else {
        alert("Failed to get video Info");
      }
    };

    const getRecommendedVideos = async () => {
      const res = await axios.get("http://localhost:5000/api/video/getVideos", {
        withCredentials: true,
      });
      if (res.data.success) {
        setRecommended(res.data.videos);
      } else {
        alert("Failed to Recommended Videos");
      }
    };

    updateViews();
    getVideo();
    getRecommendedVideos();
  }, [videoId, userId]);

  return (
    <>
      {video?.writer ? (
        <div className="py-10 px-4 space-y-4">
          {/* <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" /> */}
          <video
            className="w-full rounded-md shadow-sm bg-slate-300 aspect-video"
            src={`http://localhost:5000/${video?.filePath}`}
            controls
          ></video>
          <div className="mt-5">
            <h1 className="text-2xl font-bold text-white">{video?.title}</h1>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-4 items-center">
                <img
                  src={video?.writer.avatarUrl}
                  alt="avatar"
                  className="w-10 h-10 bg-gray-400 rounded-full"
                />
                <div className="flex flex-col space-y-0.5">
                  <h3 className="text-sm mb-0.5 font-bold text-white ">
                    {video?.writer.username}
                  </h3>
                  <span className="text-xs text-gray-400">{`구독자 0명`}</span>
                  <span className="text-xs text-gray-400">{`조회수 ${views}회`}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <LikeDislikes />
                <Subscriber userTo={video.writer._id} userFrom={userId} />
              </div>
            </div>
            <div
              className={cls(
                "my-6 bg-[#272727] px-3 py-4 rounded-2xl",
                isPOpen ? "h-28" : ""
              )}
            >
              {isPOpen ? (
                <div>
                  <p>{video?.description}</p>
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsPOpen((curr) => !curr)}
                  >
                    간략히
                  </span>
                </div>
              ) : (
                <div className="space-x-2">
                  {video?.description && video?.description?.length >= 150 ? (
                    <>
                      <p>{video?.description.substring(0, 150)}</p>
                      <span
                        className="cursor-pointer"
                        onClick={() => setIsPOpen((curr) => !curr)}
                      >
                        ... 더 보기
                      </span>
                    </>
                  ) : (
                    <p>{video?.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl">추천 동영상</h2>
            {recommended.map((video, i) => (
              <div key={i}>
                <DetailVideoCard videoWidth={"sm"} video={video} />
              </div>
            ))}
          </div>
          <div>
            <span>댓글 2개</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center my-2">
              <div className="w-12 aspect-square bg-gray-400 rounded-full" />
              <form className="border-b ml-2 w-full" action="">
                <input
                  className="appearance-none bg-transparent border-none w-full text-white py-1 leading-tight focus:outline-none placeholder:text-gray-300"
                  type="text"
                  placeholder="댓글 추가..."
                />
              </form>
            </div>
            {[1, 1, 1, 1, 1].map((_, i) => (
              <div key={i}>
                <Comment />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default DetailVideo;
