import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../_store/store";
import { authUser } from "../_store/_slice/userSlice";

type AuthSingnature = (
  SpecificComponent: any,
  option: boolean | null,
  adminRoute?: boolean
) => any;

const Auth: AuthSingnature = (
  SpecificComponent,
  option,
  adminRoute = false
) => {
  /*
    option (null/true/false)
        null -> 아무나 출입 가능
        true -> 로그인한 유저만 출입 가능
        false -> 로그인한 유저는 출입 불가능
  */

  function AuthenticationCheck() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      const fetchAuthUser = async () => {
        const res = await dispatch(authUser());
        if (!res.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !res.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      };
      fetchAuthUser();
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
};

export default Auth;
