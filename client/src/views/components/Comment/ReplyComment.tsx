import React, { useEffect, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { IComment } from "../../../libs/interface";
import SingleComment from "./SingleComment";

interface ReplyCommentProps {
  commentLists: IComment[];
  refreshFunc: any;
  parentCommentId: string;
}

const ReplyComment = ({
  commentLists,
  refreshFunc,
  parentCommentId,
}: ReplyCommentProps) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    commentLists.map((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [commentLists, parentCommentId]);

  const renderReplyComment = () =>
    commentLists.map((comment, i) => (
      <div key={i}>
        {comment.responseTo === parentCommentId && (
          <div className="ml-10 mt-2">
            <SingleComment comment={comment} refreshFunc={refreshFunc} />
            <ReplyComment
              commentLists={commentLists}
              parentCommentId={comment._id}
              refreshFunc={refreshFunc}
            />
          </div>
        )}
      </div>
    ));

  return (
    <div>
      {childCommentNumber > 0 && (
        <div
          className="mt-2 ml-10 flex space-x-1 items-center text-[#3CA3FB] text-sm cursor-pointer w-fit"
          onClick={() => setOpenReplyComments((curr) => !curr)}
        >
          {!openReplyComments ? (
            <RiArrowDownSFill className="w-6 h-6" />
          ) : (
            <RiArrowUpSFill className="w-6 h-6" />
          )}
          <span>{`답글 ${childCommentNumber}개`}</span>
        </div>
      )}
      {openReplyComments && renderReplyComment()}
    </div>
  );
};

export default ReplyComment;
