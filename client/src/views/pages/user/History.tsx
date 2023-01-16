import axios from "axios";
import { useEffect, useState } from "react";
import HomeVideoCard from "../../components/HomeVideoCard";
import { IVideo } from "../Home";

const History = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getWatchedVideos = async () => {
      const response = await axios.post(
        "http://localhost:5000/api/video/getWatchedVideos",
        { userId }
      );
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get subscription videos");
      }
    };
    getWatchedVideos();
  }, [userId]);

  return (
    <>
      <h1 className="text-3xl px-10 mt-5">시청 기록</h1>
      <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video, i) => (
          <div key={i}>
            <HomeVideoCard videoWidth="lg" video={video} />
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
