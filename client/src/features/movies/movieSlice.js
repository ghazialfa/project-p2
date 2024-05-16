"use strict";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";

const initialState = {
  list: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setFetchMovies: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFetchMovies } = movieSlice.actions;

export const fetchMovies = () => async (dispatch) => {
  try {
    const { data } = await api.get("/movies", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(setFetchMovies(data));
  } catch (error) {
    console.log("🚀 ~ fetchMovies ~ error:", error);
  }
};

export default movieSlice.reducer;
