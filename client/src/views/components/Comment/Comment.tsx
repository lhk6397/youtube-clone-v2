import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IComment } from "../../../libs/interface";
import { cls } from "../../../libs/utils";
import { RootState } from "../../../_store/store";
import ReplyComment from "./ReplyComment";
import SingleComment from "./SingleComment";

interface CommentProps {
  commentLists: IComment[];
  refreshFunc: any;
}

const Comment = ({ commentLists, refreshFunc }: CommentProps) => {
  const { videoId } = useParams();
  const [isFocus, setIsFocus] = useState(false);
  const [isOnInput, setIsOnInput] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const variables = {
      content: comment,
      writer: localStorage.getItem("userId"),
      videoId,
    };

    const res = await axios.post("/api/comment/saveComment", variables, {
      withCredentials: true,
    });
    if (res.data.success) {
      setComment("");
      setIsFocus(false);
      setIsOnInput(false);
      refreshFunc("create", res.data.foundComment);
    } else {
      alert("Failed to save Comment");
    }
  };

  return (
    <div className="space-y-3">
      {/* Root Comment Form */}
      <div className="flex items-start my-6">
        <img
          className="w-11 aspect-square bg-gray-400 rounded-full"
          src={user?.userData?.image}
          alt="avatar"
        />
        <form className="flex flex-col w-full" onSubmit={onSubmit}>
          <div
            className={cls(
              "border-b mx-3 transition-all",
              isOnInput ? "border-white" : "border-[#272727]"
            )}
          >
            <input
              className="appearance-none bg-transparent border-none w-full text-white p-0 py-1 leading-tight focus:outline-none placeholder:text-gray-300 focus:ring-0"
              type="text"
              placeholder="댓글 추가..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e.currentTarget.value)
              }
              value={comment}
              onFocus={() => {
                setIsOnInput(true);
                setIsFocus(true);
              }}
              onBlur={() => setIsOnInput(false)}
            />
          </div>
          {isFocus && (
            <div className="ml-auto mt-3 space-x-5">
              <button
                className="text-sm w-16 bg-transparent px-2 py-2 rounded-3xl hover:bg-[#272727]"
                onClick={() => {
                  setIsOnInput(false);
                  setIsFocus(false);
                }}
              >
                취소
              </button>
              <button className="text-sm w-16 bg-[#272727] hover:bg-blue-500 px-2 py-2 rounded-3xl">
                댓글
              </button>
            </div>
          )}
        </form>
      </div>
      {/* Comment Lists */}
      {commentLists &&
        commentLists.map(
          (comment, i) =>
            !comment?.responseTo && (
              <div key={i}>
                <SingleComment refreshFunc={refreshFunc} comment={comment} />
                <ReplyComment
                  commentLists={commentLists}
                  refreshFunc={refreshFunc}
                  parentCommentId={comment._id}
                />
              </div>
            )
        )}
    </div>
  );
};

export default Comment;
