import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../../assets/data/variable";
import LeftMenu from "./LeftMenu";
import { AiOutlineHome, AiOutlineLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RootState } from "../../../_store/store";
import axios from "axios";
import { IUser } from "../../../libs/interface";

const SideBar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.value);
  const [subscribedUsers, setSubscribedUsers] = useState<IUser[]>([]);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const getSubsribedUser = async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subscribe/getSubscribedUser`,
        { userFrom: userId },
        { withCredentials: true }
      );
      if (res.data.success) {
        setSubscribedUsers(res.data.subscribedUser);
      } else {
        alert("Failed to get Subscribed Users");
      }
    };
    getSubsribedUser();
  }, [userId]);

  return (
    <aside
      className={`w-64 absolute top-0 left-0 z-30 transition-all ease-in-out duration-300 ${
        !isOpen ? "-translate-x-full" : "translate-x-0 block"
      }`}
    >
      <div className="px-6 py-4 overflow-y-auto rounded bg-[#0F0F0F] min-h-screen space-y-3">
        <LeftMenu />
        <ul className="mt-3">
          <li>
            <Link
              to="/"
              className="flex items-center py-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727]"
            >
              <AiOutlineHome className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400" />
              <span className="ml-3">홈</span>
            </Link>
          </li>
          <li>
            <Link
              to="/subscription"
              className="flex items-center py-2 text-sm font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727]"
            >
              <MdSubscriptions className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap">구독</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-400 dark:border-gray-700">
          <li>
            <Link
              to={`/user/${userId}`}
              className="flex items-center py-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-[#272727] dark:hover:bg-[#272727] dark:text-white group"
            >
              <RiVideoLine className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-4">내 동영상</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/likes"
              className="flex items-center py-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-[#272727] dark:hover:bg-[#272727] dark:text-white group"
            >
              <AiOutlineLike className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">좋아요 표시한 동영상</span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/history"
              className="flex items-center py-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-[#272727] dark:hover:bg-[#272727] dark:text-white group"
            >
              <RxCounterClockwiseClock className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">시청 기록</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-400 dark:border-gray-700">
          <h3 className="px-2 text-white font-thin">구독</h3>
          {subscribedUsers &&
            subscribedUsers.map((subscribedUser, i) => (
              <li key={i}>
                <Link
                  to="#"
                  className="flex items-center py-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-[#272727] dark:hover:bg-[#272727] dark:text-white group"
                >
                  <img
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white rounded-full"
                    src={subscribedUser.avatarUrl}
                    alt="avatar"
                  />
                  <span className="ml-3">{subscribedUser.username}</span>
                </Link>
              </li>
            ))}
        </ul>
        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-400 dark:border-gray-700">
          <h3 className="px-2 text-white font-thin">탐색</h3>
          {Category.map((categoryItem, i) => (
            <li key={i}>
              <Link
                to={`/video/category?category=${categoryItem.value}`}
                className="flex items-center py-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-[#272727] dark:hover:bg-[#272727] dark:text-white group"
              >
                <RiVideoLine className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">{categoryItem.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
