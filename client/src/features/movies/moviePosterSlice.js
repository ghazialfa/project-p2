"use strict";

import { api } from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const moviePosterSlice = createSlice({
  name: "moviePoster",
  initialState,
  reducers: {
    setMoviePoster: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setMoviePoster } = moviePosterSlice.actions;
console.log("🚀 ~ setMoviePoster:", setMoviePoster);

export const fetchMoviePoster = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.get("/posters");
      console.log("🚀 ~ return ~ data:", data);
      dispatch(setMoviePoster(data));
    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
    }
  };
};

export default moviePosterSlice.reducer;
