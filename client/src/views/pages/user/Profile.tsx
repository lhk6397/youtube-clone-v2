import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser, IVideo } from "../../../libs/interface";
import DetailVideoCard from "../../components/DetailVideoCard";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/getUserProfile`,
        { userId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setUser(res.data.user);
      } else {
        alert("Failed to get User Profile");
      }
    };
    const getUserVideos = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/video/getUserVideos`,
        { userId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get subscription videos");
      }
    };

    const getSubscribeNumber = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscribe/subscribeNumber`,
        { userTo: userId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("Failed to get subscriber number");
      }
    };

    getUserProfile();
    getUserVideos();
    getSubscribeNumber();
  }, [userId]);

  return (
    <>
      {user && (
        <div className="px-6 py-4 space-y-6">
          <div className="flex space-x-6">
            <img
              className="w-20 aspect-square bg-gray-400 rounded-full"
              src={user.avatarUrl}
              alt="avatar"
            />
            <div className="flex flex-col space-y-1">
              <h3 className="text-xl mb-0.5 font-medium text-white ">
                {user.username}
              </h3>
              <span className="text-xs text-gray-400">@{user._id}</span>
              <span className="text-xs text-gray-400">{`구독자 ${subscribeNumber}명`}</span>
            </div>
          </div>
          <h1 className="text-2xl">내 동영상</h1>
          {videos.map((video, i) => (
            <div key={i}>
              <DetailVideoCard videoWidth={"lg"} video={video} />{" "}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Profile;
