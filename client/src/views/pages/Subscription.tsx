import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../_store/store";
import HomeVideoCard from "../components/HomeVideoCard";
import { IVideo } from "./Home";

const Subscription = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const userId = user?.userData._id;
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
  }, []);

  return (
    <>
      <h1 className="text-3xl px-10 mt-5">구독</h1>
      <div className="grid grid-cols-2">
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
