import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { cls, getTimegap } from "../../../libs/utils";
import { RootState } from "../../../_store/store";
import LikeDislikes from "../LikeDislikes";
import { RxDotsVertical } from "react-icons/rx";
import { GoPencil, GoTrashcan } from "react-icons/go";
import { IComment } from "../../../libs/interface";

interface SingleCommentProps {
  comment: IComment;
  refreshFunc: any;
}

const SingleComment = ({ comment, refreshFunc }: SingleCommentProps) => {
  const { videoId } = useParams();
  const [isFocus, setIsFocus] = useState(false);
  const [isOnInput, setIsOnInput] = useState(false);
  const [isOpenReplyTo, setIsOpenReplyTo] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isClickedMenu, setIsClickedMenu] = useState(false);
  const [isClickedUpdateBtn, setIsClickedUpdateBtn] = useState(false);
  const [content, setContent] = useState("");
  const user = useSelector((state: RootState) => state.user);

  const deleteComment = async () => {
    const res = await axios.post("/api/comment/deleteComment", comment, {
      withCredentials: true,
    });
    if (res.data.success) {
      refreshFunc("delete", comment);
    } else {
      alert("Failed to delete comment");
    }
  };

  const updateComment = async () => {
    const res = await axios.post(
      "/api/comment/updateComment",
      { commentId: comment._id, content },
      { withCredentials: true }
    );
    if (res.data.success) {
      refreshFunc("update", res.data.updatedComment);
    } else {
      alert("Failed to delete comment");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = {
      content,
      writer: localStorage.getItem("userId"),
      videoId,
      responseTo: comment._id,
    };

    const res = await axios.post("/api/comment/saveComment", variables);
    if (res.data.success) {
      setContent("");
      setIsOnInput(false);
      setIsOpenReplyTo(false);
      refreshFunc("create", res.data.foundComment);
    } else {
      alert("Failed to save Comment");
    }
  };

  return (
    <>
      {comment && comment?.writer && (
        <div
          className="flex space-x-4"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => {
            setIsHover(false);
            setIsClickedMenu(false);
          }}
        >
          <Link to={`/user/${comment.writer._id}`}>
            <img
              className="w-10 h-10 bg-gray-400 rounded-full"
              src={comment.writer.avatarUrl}
              alt="avatar"
            />
          </Link>
          {isClickedUpdateBtn ? (
            <form className="flex flex-col w-full" onSubmit={updateComment}>
              <div
                className={cls(
                  "border-b mx-3 transition-all",
                  isOnInput ? "border-white" : "border-[#272727]"
                )}
              >
                <input
                  className="appearance-none bg-transparent border-none w-full text-white p-0 py-1 leading-tight focus:outline-none placeholder:text-gray-300 focus:ring-0"
                  type="text"
                  placeholder="댓글 수정..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setContent(e.currentTarget.value)
                  }
                  value={content}
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
                      setIsClickedUpdateBtn(false);
                      setIsOpenReplyTo(false);
                      setContent("");
                    }}
                  >
                    취소
                  </button>
                  <button className="text-sm w-16 bg-[#272727] hover:bg-blue-500 px-2 py-2 rounded-3xl">
                    수정
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="flex flex-col space-y-0.5 w-full">
              <div className="flex items-center space-x-1">
                <h3 className="text-sm mb-0.5 font-bold">
                  {comment.writer.username}
                </h3>
                <span className="text-xs text-gray-400">
                  {getTimegap(comment.createdAt)}
                </span>
              </div>
              <div className="flex items-center">
                <p className="text-sm">{comment.content}</p>
                {isHover && (
                  <div className="ml-auto relative">
                    <RxDotsVertical
                      className=" cursor-pointer"
                      onClick={() => setIsClickedMenu((curr) => !curr)}
                    />
                    {isClickedMenu && (
                      <ul className="flex justify-center items-center flex-col mt-3 bg-[#1b1b1b] absolute right-0 py-2 rounded-xl w-28">
                        <li
                          onClick={() => {
                            setIsClickedUpdateBtn((curr) => !curr);
                            setIsOpenReplyTo(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727] cursor-pointer"
                        >
                          <GoPencil className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400" />
                          <span className="ml-3">수정</span>
                        </li>
                        <li
                          onClick={deleteComment}
                          className="flex items-center w-full px-4 py-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727] cursor-pointer"
                        >
                          <GoTrashcan className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                          <span className="flex-1 ml-3 whitespace-nowrap">
                            삭제
                          </span>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-2 flex space-x-4 items-center">
                <LikeDislikes
                  comment
                  commentId={comment._id}
                  userId={localStorage.getItem("userId") ?? ""}
                />
                <button
                  className="text-xs w-12 bg-transparent px-2 py-2 rounded-3xl hover:bg-[#272727]"
                  onClick={() => setIsOpenReplyTo((curr) => !curr)}
                >
                  답글
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {isOpenReplyTo && (
        <div className="ml-10 flex items-start my-4">
          <img
            className="w-10 aspect-square bg-gray-400 rounded-full"
            src={user.userData.image}
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
                  setContent(e.currentTarget.value)
                }
                value={content}
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
                    setIsOpenReplyTo(false);
                    setContent("");
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
      )}
    </>
  );
};

export default SingleComment;
