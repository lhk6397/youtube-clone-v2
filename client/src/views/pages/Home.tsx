import React from "react";
import HomeVideoCard from "../components/HomeVideoCard";

const Home = () => {
  return (
    <div className=" divide-y-[1px] space-y-4">
      {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <div>
          <HomeVideoCard />
        </div>
      ))}
    </div>
  );
};

export default Home;
