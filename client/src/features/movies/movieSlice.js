"use strict";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";

const initialState = {
  list: [],
  movieDetail: null,
  recommendation: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setFetchMovies: (state, action) => {
      state.list = action.payload;
    },
    setFetchMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
    setFetchRecommendation: (state, action) => {
      state.recommendation = action.payload.response;
    },
  },
});

export const { setFetchMovies, setFetchMovieDetail, setFetchRecommendation } =
  movieSlice.actions;

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

export const fetchMovieDetail = (movieId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(setFetchMovieDetail(data));
  } catch (error) {
    console.log("🚀 ~ fetchMovieDetail ~ error:", error);
  }
};

export const fetchRecommendation = (userRequest) => async (dispatch) => {
  try {
    const { data } = await api.post("/movies/ai", userRequest, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("🚀 ~ fetchRecommendation ~ data:", data);

    dispatch(setFetchRecommendation(data));
  } catch (error) {
    console.log("🚀 ~ fetchRecommendation ~ error:", error);
  }
};

export default movieSlice.reducer;
