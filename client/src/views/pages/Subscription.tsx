import React from "react";
import HomeVideoCard from "../components/HomeVideoCard";

const Subscription = () => {
  return (
    <>
      <h1 className="text-3xl px-10 mt-5">구독</h1>
      <div className=" divide-y-[1px] space-y-4">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div key={i}>{/* <HomeVideoCard /> */}</div>
        ))}
      </div>
    </>
  );
};

export default Subscription;
