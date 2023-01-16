import React from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl mt-10">계정 설정</h1>
      <div className="mt-10 space-y-10 text-center flex flex-col">
        <button
          className="w-52 px-4 py-2 rounded-2xl bg-[#282828]"
          onClick={() => navigate("changeImage")}
        >
          이미지 변경
        </button>
        <button
          className="w-52 px-4 py-2 rounded-2xl bg-[#282828]"
          onClick={() => navigate("changePassword")}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
