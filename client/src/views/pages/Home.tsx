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
  views: number;
  duration: number;
  thumbnail: string;
  createdAt: any;
  updatedAt: any;
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
        console.log(response.data);
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    };
    getVideos();
  }, []);
  return (
    <div className="space-y-4">
      {videos.map((video, i) => (
        <div key={i}>
          <HomeVideoCard video={video} />
        </div>
      ))}
    </div>
  );
};

export default Home;
