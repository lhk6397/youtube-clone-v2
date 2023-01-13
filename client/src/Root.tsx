import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { cls } from "./libs/utils";
import Flash from "./views/components/Flash";
import Header from "./views/components/Header/Header";
import { RootState } from "./_store/store";
import { reverse } from "./_store/_slice/sidebarSlice";

function Root() {
  const location = useLocation();
  const isOpen = useSelector((state: RootState) => state.sidebar.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) dispatch(reverse());
  }, [location?.pathname]);

  return (
    <div className={cls(isOpen ? "overflow-hidden h-screen" : "")}>
      <Header />
      <div className="pt-14 bg-[#0F0F0F] text-white min-h-screen">
        {/* <Flash /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
