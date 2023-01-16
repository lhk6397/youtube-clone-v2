import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../_store/store";
import LeftMenu from "./LeftMenu";
import SideBar from "./SideBar";
import { BiUserPin } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import LargeSideBar from "./LargeSideBar";

const Overlay = () => {
  return <div className="absolute w-full h-screen bg-black opacity-60 z-20" />;
};

const Header = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [avatarClicked, setAvatarClicked] = useState(false);
  const isOpen = useSelector((state: RootState) => state.sidebar.value);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (avatarClicked) setAvatarClicked(false);
  }, [location.pathname]);

  const logoutHandler = async () => {
    const response = await axios.get("http://localhost:5000/api/user/logout", {
      withCredentials: true,
    });
    if (response.data.success) {
      localStorage.removeItem("userId");
      navigate("/login");
    } else {
      alert("Logout Error!");
    }
  };

  return (
    <>
      <SideBar />
      {location.pathname !== `/video/${videoId}` && (
        <div className="hidden lg:block">
          <LargeSideBar />
        </div>
      )}
      {isOpen && <Overlay />}
      <div className="z-10 fixed w-full h-14 flex items-center justify-between px-6 bg-[#0F0F0F]">
        <LeftMenu />
        <div className="flex space-x-4 items-center lg:space-x-6">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          <button>
            <Link to="/video/upload">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </Link>
          </button>
          {user && user?.userData?.isAuth ? (
            <div className="relative ">
              <img
                src={user.userData.image}
                alt="avatar"
                className="rounded-full bg-slate-400 w-7 h-7 cursor-pointer"
                onClick={() => setAvatarClicked((curr) => !curr)}
              />
              {avatarClicked && (
                <section className="w-64 absolute bg-[#282828] text-base z-50 list-none text-left rounded-lg shadow-lg border-none right-0 divide-gray-700 divide-y-[0.5px] overflow-hidden">
                  <div className="px-4 flex items-start space-x-3 py-4">
                    <img
                      src={user.userData.image}
                      alt="avatar"
                      className="w-10 aspect-square bg-gray-400 rounded-full cursor-pointer"
                      onClick={() => setAvatarClicked((curr) => !curr)}
                    />
                    <div className="flex flex-col space-y-1">
                      <h3 className="mb-0.5 font-medium text-white ">
                        {user.userData.username}
                      </h3>
                      <span className="text-xs text-white">
                        @{user.userData._id}
                      </span>
                    </div>
                  </div>
                  <ul aria-labelledby="dropdownMenuButton1">
                    <li>
                      <Link
                        to={`/user/${user.userData._id}`}
                        className="text-sm py-2 px-4 font-normal whitespace-nowrap bg-transparent text-white hover:bg-[#3E3E3E] flex items-center space-x-4"
                      >
                        <BiUserPin className="flex-shrink-0 w-6 h-6" />
                        <span>내 채널</span>
                      </Link>
                    </li>
                    <li>
                      <div
                        className="text-sm py-2 px-4 font-normal whitespace-nowrap bg-transparent text-white hover:bg-[#3E3E3E] flex items-center space-x-4"
                        onClick={logoutHandler}
                      >
                        <MdOutlineLogout className="flex-shrink-0 w-6 h-6" />
                        <span>로그아웃</span>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="/user/update"
                        className="text-sm py-2 px-4 font-normal whitespace-nowrap bg-transparent text-white hover:bg-[#3E3E3E] flex items-center space-x-4"
                      >
                        <IoSettingsOutline className="flex-shrink-0 w-6 h-6" />
                        <span>계정</span>
                      </Link>
                    </li>
                  </ul>
                </section>
              )}
            </div>
          ) : (
            <Link to="/login">
              <div className="rounded-3xl border border-gray-700 flex space-x-2 py-1.5 px-3 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-6 h-6 stroke-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-blue-500">로그인</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
