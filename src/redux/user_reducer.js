import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    data: {},
    myCourses: [],
    allCourses: [],
  },
  reducers: {
    setData: (state, action) => {
      return { ...state, data: action.payload };
    },
    setCourses: (state, action) => {
      return { ...state, myCourses: action.payload };
    },
    setAllCourses: (state, action) => {
      return { ...state, allCourses: action.payload };
    },
    reset: (state, action) => {
      return { data: {}, myCourses: [], allCourses: [] };
    },
  },
});

export const { setData, setCourses, reset, setAllCourses} = userReducer.actions;

export default userReducer.reducer;
