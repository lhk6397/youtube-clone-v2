import axios from "axios";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IVideo } from "../../../libs/interface";
import HomeVideoCard from "../../components/HomeVideoCard";

const SearchedVideos = () => {
  const location = useLocation();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { search } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    const getSearchedVideos = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/video/getSearchedVideos`,
        {
          search,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        setVideos(response.data.searchedVideos);
      } else {
        alert("Failed to get subscription videos");
      }
    };
    getSearchedVideos();
  }, [search]);
  return (
    <>
      <h1 className="text-3xl px-10 mt-5">검색 결과: {search as string}</h1>
      <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video, i) => (
          <div key={i}>
            <HomeVideoCard videoWidth="lg" video={video} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchedVideos;
