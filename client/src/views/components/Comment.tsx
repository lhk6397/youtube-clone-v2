import React from "react";
import LikeDislikes from "./LikeDislikes";

const Comment = () => {
  return (
    <div className="flex space-x-4">
      <div className="w-10 h-10 bg-gray-400 rounded-full" />
      <div className="flex flex-col space-y-0.5">
        <div className="flex items-center space-x-1">
          <h3 className="text-sm mb-0.5 font-bold">Username</h3>
          <span className="text-xs text-gray-400">1년 전</span>
        </div>
        <p className="text-sm">우와 정말 감사합니다!</p>
        <div className="pt-2">
          <LikeDislikes />
        </div>
      </div>
    </div>
  );
};

export default Comment;
