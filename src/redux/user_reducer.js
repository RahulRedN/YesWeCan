import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    setData: (state, action) => {
      return { data: action.payload };
    },
    reset: (state, action) => {
      return {data: {}};
    },
  },
});

export const { setData, reset } = userReducer.actions;

export default userReducer.reducer;
