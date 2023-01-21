import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineLike } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { RxCounterClockwiseClock } from "react-icons/rx";

const LargeSideBar = () => {
  const userId = localStorage.getItem("userId");
  return (
    <aside className="top-0 left-0 z-10 pt-16 fixed">
      <ul className="overflow-y-auto rounded bg-[#0F0F0F] min-h-screen w-[8.5rem] pr-14 flex flex-col items-center">
        <li>
          <Link
            to="/"
            className="p-4 flex flex-col items-center text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727]"
          >
            <AiOutlineHome className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400" />
            <span className="text-center">홈</span>
          </Link>
        </li>
        <li>
          <Link
            to="/subscription"
            className="p-4 flex flex-col items-center text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727]"
          >
            <MdSubscriptions className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400" />
            <span className="text-center">구독</span>
          </Link>
        </li>
        <li>
          <Link
            to={`/user/${userId}`}
            className="p-4 flex flex-col items-center text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727]"
          >
            <RiVideoLine className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400" />
            <span className="text-center">내 동영상</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user/likes"
            className="p-4 flex flex-col items-center text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727]"
          >
            <AiOutlineLike className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400" />
            <span className="text-center">좋아요 표시한 동영상</span>
          </Link>
        </li>
        <li>
          <Link
            to="/user/history"
            className="p-4 flex flex-col items-center text-xs font-normal text-gray-900 rounded-lg dark:text-white hover:bg-[#272727] dark:hover:bg-[#272727]"
          >
            <RxCounterClockwiseClock className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white dark:text-gray-400" />
            <span className="text-center">시청 기록</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default LargeSideBar;
