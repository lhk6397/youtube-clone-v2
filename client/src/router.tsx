import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import {
  AuthHome,
  AuthLogin,
  AuthRegister,
  AuthDetailVideo,
  AuthUploadVideo,
  NotFound,
  AuthProfile,
  AuthSubscription,
  AuthHistory,
} from "./views/pages/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <AuthHome />,
      },
      {
        path: "/login",
        element: <AuthLogin />,
      },
      {
        path: "/register",
        element: <AuthRegister />,
      },
      {
        path: "/video",
        children: [
          {
            path: "upload",
            element: <AuthUploadVideo />,
          },
          {
            path: ":videoId",
            element: <AuthDetailVideo />,
          },
        ],
      },
      {
        path: "/user",
        children: [
          {
            path: "history",
            element: <AuthHistory />,
          },
          {
            path: ":userId",
            element: <AuthProfile />,
          },
        ],
      },
      {
        path: "/subscription",
        element: <AuthSubscription />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
