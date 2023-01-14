import { createBrowserRouter } from "react-router-dom";
import Auth from "./hoc/authHoc";
import Root from "./Root";
import {
  Home,
  Login,
  Register,
  DetailVideo,
  UploadVideo,
  NotFound,
  Profile,
  Subscription,
} from "./views/pages/index";

const AuthHome = Auth(Home, null);
const AuthLogin = Auth(Login, false);
const AuthRegister = Auth(Register, false);
const AuthUploadVideo = Auth(UploadVideo, true);
const AuthDetailVideo = Auth(DetailVideo, null);
const AuthSubscription = Auth(Subscription, null);

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
        path: "/user/profile",
        element: <Profile />,
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
