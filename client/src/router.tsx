import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import {
  Home,
  Login,
  Register,
  DetailVideo,
  UploadVideo,
  NotFound,
  Profile,
} from "./views/pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/video",
        children: [
          {
            path: "upload",
            element: <UploadVideo />,
          },
          {
            path: ":videoId",
            element: <DetailVideo />,
          },
        ],
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
