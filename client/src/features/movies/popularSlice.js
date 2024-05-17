"use strict";

import { api } from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popular: [],
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setFetchPopular: (state, action) => {
      state.popular = action.payload;
      // console.log("🚀 ~ action.payload:", action.payload);
    },
  },
});

export const { setFetchPopular } = popularSlice.actions;

export const fetchPopular =
  (page = 1) =>
  async (dispatch, getState) => {
    try {
      const { data } = await api.get(`/movies/popular?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (page > 1) {
        const existingPopular = getState().popular.popular.results;
        dispatch(
          setFetchPopular({ results: [...existingPopular, ...data.results] })
        );
      } else {
        dispatch(setFetchPopular(data));
      }
    } catch (error) {
      console.log("🚀 ~ fetchPopular ~ error:", error);
    }
  };

export default popularSlice.reducer;
