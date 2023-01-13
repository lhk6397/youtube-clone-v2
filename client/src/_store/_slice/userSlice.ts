import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginForm } from "../../views/pages/Login";
import { RegisterForm } from "../../views/pages/Register";

export interface userState {
  loginSuccess?: any;
  register?: any;
  userData?: any;
}

export const loginUser = createAsyncThunk(
  "userSlice/loginUser",
  async (dataSubmit: LoginForm) => {
    return axios
      .post("http://localhost:5000/api/user/login", dataSubmit, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
);

export const registerUser = createAsyncThunk(
  "userSlice/registerUser",
  async (dataSubmit: RegisterForm) => {
    return axios
      .post("http://localhost:5000/api/user/register", dataSubmit, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
);

export const authUser = createAsyncThunk("userSlice/authUser", async () => {
  return axios
    .get("http://localhost:5000/api/user/auth", { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => console.log(error));
});

export const userSlice = createSlice({
  // slice 이름 정의
  name: "userSlice",
  // 초기 값
  initialState: {} as userState,
  // 리듀서. 여러 개 기입 가능
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(loginUser.pending, (state, action) => {
    //   state.status = "Loading...";
    // });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      //   state.status = "Success";
      return { ...state, loginSuccess: action.payload };
    });
    // builder.addCase(loginUser.rejected, (state, action) => {
    //   state.status = "ERROR";
    // });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return { ...state, register: action.payload };
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      return { ...state, userData: action.payload };
    });
  },
});

// 각각의 리듀서의 액션을 생성
export const { login, register }: any = userSlice.actions;

// slice를 내보냄
export default userSlice.reducer;
