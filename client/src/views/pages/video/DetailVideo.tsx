import { spawn } from "child_process";
import React, { useState } from "react";
import { cls } from "../../../libs/utils";
import Comment from "../../components/Comment";
import DetailVideoCard from "../../components/DetailVideoCard";
import LikeDislikes from "../../components/LikeDislikes";
import Subscriber from "../../components/Subscriber";

const sudoText: string =
  "My money&apos;s in that office, right? If she start giving me some bullshit about it ain&apos;t there, and we got to go someplace else and get it, I&apos;m gonna shoot you in the head then and there. Then I&apos;m gonna shoot that bitch in the kneecaps, find out where mygoddamn money is. She gonna tell me too. Hey, look at me when I&apos;m talking to you, motherfucker. You listen: we go in there, and that ni**a Winston or anybody else is in there, you the first mother fucker to get shot. You understand";

const DetailVideo = () => {
  const [isPOpen, setIsPOpen] = useState(false);
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-white">테스트용 제목입니다</h1>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-gray-400 rounded-full" />
            <div className="flex flex-col space-y-0.5">
              <h3 className="text-sm mb-0.5 font-bold text-white ">Username</h3>
              <span className="text-xs text-gray-400">구독자 0명</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <LikeDislikes />
            <Subscriber />
          </div>
        </div>
        <p
          className={cls(
            "my-6 bg-[#272727] px-3 py-4 rounded-2xl",
            !isPOpen ? "h-28" : ""
          )}
        >
          {isPOpen ? (
            <div>
              <p>{sudoText}</p>
              <span
                className="cursor-pointer"
                onClick={() => setIsPOpen((curr) => !curr)}
              >
                간략히
              </span>
            </div>
          ) : (
            <div className="space-x-2">
              <span>{sudoText.substring(0, 150) + "..."}</span>
              <span
                className="cursor-pointer"
                onClick={() => setIsPOpen((curr) => !curr)}
              >
                더 보기
              </span>
            </div>
          )}
        </p>
      </div>
      <div>
        <h2 className="text-2xl">추천 동영상</h2>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div key={i}>
            <DetailVideoCard videoWidth={"sm"} />
          </div>
        ))}
      </div>
      <div>
        <span>댓글 2개</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center my-2">
          <div className="w-12 aspect-square bg-gray-400 rounded-full" />
          <form className="border-b ml-2 w-full" action="">
            <input
              className="appearance-none bg-transparent border-none w-full text-white py-1 leading-tight focus:outline-none placeholder:text-gray-300"
              type="text"
              placeholder="댓글 추가..."
            />
          </form>
        </div>
        {[1, 1, 1, 1, 1].map((_, i) => (
          <div key={i}>
            <Comment />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailVideo;
