import React from "react";
import DetailVideoCard from "../../components/DetailVideoCard";

const Profile = () => {
  return (
    <div className="px-6 py-4 space-y-5">
      <div className="flex space-x-6">
        <div className="w-20 aspect-square bg-gray-400 rounded-full" />
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl mb-0.5 font-medium text-white ">Username</h3>
          <span className="text-xs text-gray-400">@유저아이디</span>
          <span className="text-xs text-gray-400">구독자 0명</span>
        </div>
      </div>
      <h1 className="text-2xl font-extralight">My Video</h1>
      {[1, 1, 1, 1].map((_, i) => (
        <div key={i}>{/* <DetailVideoCard videoWidth={"lg"} /> */}</div>
      ))}
    </div>
  );
};

export default Profile;
