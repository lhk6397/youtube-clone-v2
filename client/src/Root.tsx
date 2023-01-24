import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { cls } from "./libs/utils";
import Header from "./views/components/Header/Header";
import { RootState } from "./_store/store";
import { reverse } from "./_store/_slice/sidebarSlice";

function Root() {
  const { videoId } = useParams();
  const location = useLocation();
  const isOpen = useSelector((state: RootState) => state.sidebar.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) dispatch(reverse());
  }, [location]);

  return (
    <div className={cls(isOpen ? "overflow-hidden h-screen" : "")}>
      <Header />
      <div
        className={cls(
          "pt-14 bg-[#0F0F0F] text-white min-h-screen",
          location.pathname !== `/video/${videoId}`
            ? "lg:pl-36 lg:pr-4"
            : "lg:px-14"
        )}
      >
        {/* <Flash /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
