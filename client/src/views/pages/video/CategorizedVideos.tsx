import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QueryString from "qs";
import { Category } from "../../../assets/data/variable";
const CategorizedVideos = () => {
  const { search } = useLocation();
  const { category } = QueryString.parse(search, {
    ignoreQueryPrefix: true,
  });
  const categoryItem = Category.find((e) => e.value === Number(category));
  return <h1>{categoryItem?.label}</h1>;
};

export default CategorizedVideos;
