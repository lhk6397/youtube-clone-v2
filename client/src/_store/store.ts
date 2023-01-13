import { sidebarSlice } from "./_slice/sidebarSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./_slice/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});

// useSelector 사용시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof store.getState>;

// useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;

export default store;
