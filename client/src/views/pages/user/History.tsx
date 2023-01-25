import axios from "axios";
import { useEffect, useState } from "react";
import { IVideo } from "../../../libs/interface";
import HomeVideoCard from "../../components/HomeVideoCard";

const History = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getWatchedVideos = async () => {
      const response = await axios.post("/api/video/getWatchedVideos", {
        userId,
      });
      if (response.data.success) {
        setVideos(response.data.videos);
        setIsLoading(true);
      } else {
        alert("Failed to get subscription videos");
      }
    };
    getWatchedVideos();
  }, [userId]);

  return (
    <>
      {isLoading ? (
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
      ) : (
        <h1 className="text-3xl px-10 mt-5">Loading...</h1>
      )}
    </>
  );
};

export default History;
