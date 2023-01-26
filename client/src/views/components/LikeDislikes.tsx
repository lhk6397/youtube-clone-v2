import axios from "axios";
import { useEffect, useState } from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";

interface ILikeDislike {
  _id: string;
  userId: string;
  commentId: string;
  videoId: string;
}

interface LikeDislikesProps {
  video?: boolean;
  comment?: boolean;
  videoId?: string;
  userId: string;
  commentId?: string;
}

type likeDislikeAction = "liked" | "disliked" | "";

const LikeDislikes = ({
  video,
  comment,
  videoId,
  userId,
  commentId,
}: LikeDislikesProps) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState<likeDislikeAction>("");
  const [dislikeAction, setDislikeAction] = useState<likeDislikeAction>("");
  let variable = {};

  if (video) {
    variable = {
      videoId,
      userId,
    };
  } else if (comment) {
    variable = {
      commentId,
      userId,
    };
  }

  useEffect(() => {
    const getLikes = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/like/getLikes`,
        variable,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // How many likes does this video or comment have
        setLikes(res.data.likes.length);
        res.data.likes.map((like: ILikeDislike) => {
          if (like.userId === userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    };

    const getDislikes = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/like/getDislikes`,
        variable,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // How many likes does this video or comment have
        setDislikes(res.data.dislikes.length);
        res.data.dislikes.map((dislike: ILikeDislike) => {
          if (dislike.userId === userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    };

    getLikes();
    getDislikes();
  }, []);

  const onLike = async () => {
    if (likeAction === "") {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/like/upLike`,
        variable
      );
      if (res.data.success) {
        setLikes((curr) => curr + 1);
        setLikeAction("liked");

        // If dislike button is already clicked
        if (dislikeAction !== "") {
          setDislikeAction("");
          setDislikes((curr) => curr - 1);
        }
      } else {
        alert("Failed to increase the like");
      }
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/like/unLike`,
        variable
      );
      if (res.data.success) {
        setLikes((curr) => curr - 1);
        setLikeAction("");
      } else {
        alert("Failed to decrease the like");
      }
    }
  };

  const onDisLike = async () => {
    if (dislikeAction === "") {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/like/upDisLike`,
        variable
      );
      if (res.data.success) {
        setDislikes((curr) => curr + 1);
        setDislikeAction("disliked");

        // If dislike button is already clicked
        if (likeAction !== "") {
          setLikeAction("");
          setLikes((curr) => curr - 1);
        }
      } else {
        alert("Failed to increase the dislike");
      }
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/like/unDisLike`,
        variable
      );
      if (res.data.success) {
        setDislikes((curr) => curr - 1);
        setDislikeAction("");
      } else {
        alert("Failed to decrease the dislike");
      }
    }
  };
  return (
    <div className="text-muted flex items-center">
      <div
        key="comment-basic-like"
        className="flex space-x-2 items-center justify-center px-2 py-1 rounded-2xl bg-[#272727] rounded-r-none border-r border-gray-600 cursor-pointer hover:bg-red-600"
      >
        {likeAction === "liked" ? (
          <AiFillLike title="Like" onClick={onLike}></AiFillLike>
        ) : (
          <AiOutlineLike title="Like" onClick={onLike}></AiOutlineLike>
        )}
        <span>{likes}</span>
      </div>
      <div
        key="comment-basic-dislike"
        className="flex space-x-2 items-center justify-center px-2 py-1 rounded-2xl bg-[#272727] rounded-l-none cursor-pointer hover:bg-red-600"
      >
        {dislikeAction === "disliked" ? (
          <AiFillDislike title="Dislike" onClick={onDisLike}></AiFillDislike>
        ) : (
          <AiOutlineDislike
            title="Dislike"
            onClick={onDisLike}
          ></AiOutlineDislike>
        )}
        <span>{dislikes}</span>
      </div>
    </div>
  );
};

export default LikeDislikes;
