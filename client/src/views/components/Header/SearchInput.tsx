import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
const SearchInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize > 1024) {
      return setIsSearching(true);
    } else {
      if (isSearching) {
        return setIsSearching(false);
      }
    }
  }, [windowSize, location]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue("");
    setIsSearching(false);
    navigate(`/video?search=${searchValue}`);
  };

  return (
    <>
      {isSearching ? (
        <div className="absolute inset-y-0 left-0 z-30 bg-[#0F0F0F] flex items-center w-full px-10 lg:block lg:bg-transparent lg:w-fit lg:left-1/2 lg:-translate-x-1/2 lg:inset-y-auto">
          <button
            className="mr-10 text-white lg:hidden"
            onClick={() => setIsSearching(false)}
          >
            <BiArrowBack className="w-6 h-6" />
          </button>
          <form
            className="w-full flex items-center rounded-2xl border border-[#222222] lg:w-full"
            onSubmit={onSubmit}
          >
            <div className="px-3 border-l border-[#222222] rounded-l-lg">
              <div className="pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-5 h-5"
                  onClick={() => setIsSearching((curr) => !curr)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
            <div className="relative w-full lg:w-fit">
              <input
                type="search"
                id="location-search"
                className="text-gray-300 bg-[#0F0F0F] border border-[#222222] rounded-r-lg w-full focus:border-none lg:w-[50vw]"
                placeholder="검색"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.currentTarget.value)
                }
                required
              />
              <button
                type="submit"
                className="absolute right-0 h-full px-3 pl-5 bg-[#222222] text-white rounded-r-lg border border-[#222222]"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button>
          {/* 검색 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
            onClick={() => setIsSearching((curr) => !curr)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default SearchInput;
