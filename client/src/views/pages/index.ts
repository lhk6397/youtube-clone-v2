import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import DetailVideo from "./video/DetailVideo";
import UploadVideo from "./video/UploadVideo";
import Profile from "./user/Profile";
import Subscription from "./Subscription";
import NotFound from "./404";
import Auth from "../../hoc/authHoc";
import History from "./History";

const AuthHome = Auth(Home, null);
const AuthLogin = Auth(Login, false);
const AuthRegister = Auth(Register, false);
const AuthUploadVideo = Auth(UploadVideo, true);
const AuthDetailVideo = Auth(DetailVideo, null);
const AuthSubscription = Auth(Subscription, null);
const AuthProfile = Auth(Profile, null);
const AuthHistory = Auth(History, true);

export {
  AuthHome,
  AuthLogin,
  AuthRegister,
  AuthDetailVideo,
  AuthUploadVideo,
  AuthProfile,
  NotFound,
  AuthSubscription,
  AuthHistory,
};
