import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeVideoCard from "../components/HomeVideoCard";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: number;
  avatarUrl: string;
  __v: number;
}

export interface IVideo {
  _id: string;
  writer: IUser;
  title: string;
  description: string;
  privacy: string;
  filePath: string;
  category: string;
  duration: number;
  thumbnail: string;
  createdAt: number;
  updatedAt?: any;
  __v?: number;
}

const Home = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/video/getVideos"
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
