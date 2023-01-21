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
  AuthUpdateProfile,
  AuthChangeImage,
  AuthChangePassword,
  AuthLikeVideos,
  AuthUpdateVideo,
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
        path: "login",
        element: <AuthLogin />,
      },
      {
        path: "register",
        element: <AuthRegister />,
      },
      {
        path: "video",
        children: [
          {
            path: "upload",
            element: <AuthUploadVideo />,
          },
          {
            path: ":videoId",
            children: [
              {
                path: "",
                element: <AuthDetailVideo />,
              },
              {
                path: "update",
                element: <AuthUpdateVideo />,
              },
            ],
          },
        ],
      },
      {
        path: "user",
        children: [
          {
            path: "history",
            element: <AuthHistory />,
          },
          {
            path: ":userId",
            element: <AuthProfile />,
          },
          {
            path: "likes",
            element: <AuthLikeVideos />,
          },
          {
            path: "update",
            children: [
              {
                path: "",
                element: <AuthUpdateProfile />,
              },
              {
                path: "changeImage",
                element: <AuthChangeImage />,
              },
              {
                path: "changePassword",
                element: <AuthChangePassword />,
              },
            ],
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
