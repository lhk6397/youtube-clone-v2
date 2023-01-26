import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IComment, IVideo } from "../../../libs/interface";
import { cls } from "../../../libs/utils";
import { RootState } from "../../../_store/store";
import Comment from "../../components/Comment/Comment";
import DetailVideoCard from "../../components/DetailVideoCard";
import LikeDislikes from "../../components/LikeDislikes";
import Subscriber from "../../components/Subscriber";

const DetailVideo = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [views, setViews] = useState(0);
  const [video, setVideo] = useState<IVideo>();
  const [recommended, setRecommended] = useState<IVideo[]>([]);
  const [isPOpen, setIsPOpen] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const userId = user?.userData?._id;

  useEffect(() => {
    const updateViews = async () => {
      const viewRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/view/updateView`,
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
        `${process.env.REACT_APP_API_URL}/api/video/getVideo`,
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
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/video/getVideos`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setRecommended(res.data.videos);
      } else {
        alert("Failed to Recommended Videos");
      }
    };

    const getComments = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comment/getComments`,
        { videoId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        alert("Failed to Recommended Videos");
      }
    };

    updateViews();
    getVideo();
    getRecommendedVideos();
    getComments();
  }, [videoId]);

  const refreshFunc = (type: string, comment: IComment) => {
    if (type === "create") {
      setComments(comments.concat(comment));
    } else if (type === "delete") {
      setComments(
        comments.filter(
          (ccomment) =>
            ccomment._id !== comment._id && ccomment?.responseTo !== comment._id
        )
      );
    } else {
      // update
      setComments(
        comments.map((ccomment: IComment) =>
          ccomment._id === comment._id
            ? { ...ccomment, content: comment.content }
            : ccomment
        )
      );
    }
  };

  const deleteVideo = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/video/deleteVideo`,
      { videoId, fileName: video?.fileName },
      { withCredentials: true }
    );
    if (res.data.success) {
      navigate("/");
      alert("Success to Delete the Video!");
    } else {
      alert("Failed to Delete the Video");
    }
  };

  return (
    <>
      {video?.writer ? (
        <div className="py-10 px-4 space-y-4 lg:flex lg:space-x-10 lg:space-y-0">
          <div className="lg:w-2/3 pb-3">
            <video
              className="w-full rounded-md shadow-sm bg-slate-300 aspect-video "
              src={video?.filePath}
              controls
            ></video>

            <div className="mt-5">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">
                  {video?.title}
                </h1>
                {video.writer._id === localStorage.getItem("userId") && (
                  <div className="space-x-3">
                    <button
                      className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl"
                      onClick={() => navigate(`/video/${video._id}/update`)}
                    >
                      수정
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl"
                      onClick={deleteVideo}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-4 items-center">
                  <Link to={`/user/${video.writer._id}`}>
                    <img
                      src={video?.writer.avatarUrl}
                      alt="avatar"
                      className="w-10 h-10 bg-gray-400 rounded-full"
                    />
                  </Link>
                  <div className="flex flex-col space-y-0.5">
                    <h3 className="text-sm mb-0.5 font-bold text-white ">
                      {video?.writer.username}
                    </h3>
                    <span className="text-xs text-gray-400">{`조회수 ${views}회`}</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <LikeDislikes
                    video
                    videoId={videoId}
                    userId={localStorage.getItem("userId") ?? ""}
                  />
                  {video.writer._id !== userId && (
                    <Subscriber userTo={video.writer._id} userFrom={userId} />
                  )}
                </div>
              </div>
              <div
                className={cls(
                  "my-6 bg-[#272727] px-4 py-2 rounded-2xl",
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

            <div className="space-y-4">
              <span>{`댓글 ${comments.length}개`}</span>
              <Comment refreshFunc={refreshFunc} commentLists={comments} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl">추천 동영상</h1>
            {recommended.map((video, i) => (
              <div key={i}>
                <DetailVideoCard videoWidth={"sm"} video={video} />
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
