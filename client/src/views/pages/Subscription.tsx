import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeVideoCard from "../components/HomeVideoCard";
import { IVideo } from "./Home";

const Subscription = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.post(
        "http://localhost:5000/api/video/getSubscriptionVideos",
        { userFrom: userId }
      );
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get subscription videos");
      }
    };
    getVideos();
  }, [userId]);

  return (
    <>
      <h1 className="text-3xl px-10 mt-5">구독</h1>
      <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video, i) => (
          <div key={i}>
            <HomeVideoCard videoWidth="sm" video={video} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Subscription;
