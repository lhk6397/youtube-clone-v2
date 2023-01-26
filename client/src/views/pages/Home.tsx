import axios from "axios";
import React, { useEffect, useState } from "react";
import { IVideo } from "../../libs/interface";
import HomeVideoCard from "../components/HomeVideoCard";

const Home = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/video/getVideos`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    };
    getVideos();
  }, []);
  return (
    <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video, i) => (
        <div key={i}>
          <HomeVideoCard videoWidth="lg" video={video} />
        </div>
      ))}
    </div>
  );
};

export default Home;
