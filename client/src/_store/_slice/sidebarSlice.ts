import { createSlice } from "@reduxjs/toolkit";

export interface sidebarState {
  value: boolean;
}

// 초기 값 선언
const initialState: sidebarState = {
  value: false,
};

export const sidebarSlice = createSlice({
  // slice 이름 정의
  name: "isOpen",
  // 초기 값
  initialState,
  // 리듀서. 여러 개 기입 가능
  reducers: {
    reverse: (state: sidebarState) => {
      state.value = !state.value;
    },
  },
});

// 각각의 리듀서의 액션을 생성
export const { reverse } = sidebarSlice.actions;

// slice를 내보냄
export default sidebarSlice.reducer;
