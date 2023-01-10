import React, { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";

const LikeDislikes = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  return (
    <div className="text-muted flex items-center">
      <div
        key="comment-basic-like"
        className="flex space-x-2 items-center justify-center px-2 py-1 rounded-2xl bg-[#272727] rounded-r-none border-r border-gray-600 cursor-pointer hover:bg-red-600"
      >
        {likeAction === "liked" ? (
          <AiFillLike title="Like"></AiFillLike>
        ) : (
          <AiOutlineLike title="Like"></AiOutlineLike>
        )}
        <span>{likes}</span>
      </div>
      <div
        key="comment-basic-dislike"
        className="flex space-x-2 items-center justify-center px-2 py-1 rounded-2xl bg-[#272727] rounded-l-none cursor-pointer hover:bg-red-600"
      >
        {dislikeAction === "disliked" ? (
          <AiFillDislike title="Dislike"></AiFillDislike>
        ) : (
          <AiOutlineDislike title="Dislike"></AiOutlineDislike>
        )}
        <span>{dislikes}</span>
      </div>
    </div>
  );
};

export default LikeDislikes;
