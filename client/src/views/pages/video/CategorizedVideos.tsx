import { useLocation } from "react-router-dom";
import QueryString from "qs";
import { Category } from "../../../assets/data/variable";
import { useEffect, useState } from "react";
import HomeVideoCard from "../../components/HomeVideoCard";
import { IVideo } from "../../../libs/interface";
import axios from "axios";

const CategorizedVideos = () => {
  const { search } = useLocation();
  const { category } = QueryString.parse(search, {
    ignoreQueryPrefix: true,
  });
  const categoryItem = Category.find((e) => e.value === Number(category));
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const getCategorizedVideos = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/video/getCategorizedVideos`,
        {
          category: categoryItem?.label,
        }
      );
      if (response.data.success) {
        setVideos(response.data.categorizedVideos);
      } else {
        alert("Failed to get subscription videos");
      }
    };
    getCategorizedVideos();
  }, [search]);

  return (
    <>
      <h1 className="text-3xl px-10 mt-5">{categoryItem?.label}</h1>
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

export default CategorizedVideos;
