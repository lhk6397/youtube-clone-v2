import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import DetailVideo from "./video/DetailVideo";
import UploadVideo from "./video/UploadVideo";
import Profile from "./user/Profile";
import Subscription from "./Subscription";
import NotFound from "./404";
import Auth from "../../hoc/authHoc";
import History from "./user/History";
import UpdateProfile from "./user/UpdateProfile";
import ChangeImage from "./user/ChangeImage";
import ChangePassword from "./user/ChangePassword";
import LikeVideos from "./user/LikeVideos";
import UpdateVideo from "./video/UpdateVideo";
import CategorizedVideos from "./video/CategorizedVideos";

const AuthHome = Auth(Home, null);
const AuthLogin = Auth(Login, false);
const AuthRegister = Auth(Register, false);
const AuthUploadVideo = Auth(UploadVideo, true);
const AuthDetailVideo = Auth(DetailVideo, null);
const AuthSubscription = Auth(Subscription, null);
const AuthProfile = Auth(Profile, null);
const AuthHistory = Auth(History, true);
const AuthUpdateProfile = Auth(UpdateProfile, true);
const AuthChangeImage = Auth(ChangeImage, true);
const AuthChangePassword = Auth(ChangePassword, true);
const AuthLikeVideos = Auth(LikeVideos, true);
const AuthUpdateVideo = Auth(UpdateVideo, true);
const AuthCategorizedVideos = Auth(CategorizedVideos, null);

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
  AuthUpdateProfile,
  AuthChangeImage,
  AuthChangePassword,
  AuthLikeVideos,
  AuthUpdateVideo,
  AuthCategorizedVideos,
};
