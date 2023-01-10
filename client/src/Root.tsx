import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./views/components/Header";

function Root() {
  return (
    <>
      <Header />
      <div className="pt-14 bg-[#0F0F0F] text-white min-h-[300vh]">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
