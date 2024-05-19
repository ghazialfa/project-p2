"use strict";

import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";

const initialState = {
  popular: {
    results: [],
  },
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setFetchPopular: (state, action) => {
      state.popular = action.payload;
      console.log("🚀 ~ setFetchPopular payload:", action.payload);
    },
  },
});

export const { setFetchPopular } = popularSlice.actions;

export const fetchPopular =
  (page = 1) =>
  async (dispatch, getState) => {
    try {
      const { data } = await api.get(`/movies/popular`, {
        params: {
          page,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("🚀 ~ page:", page);
      console.log("🚀 ~ fetchPopular ~ data:", data);

      const existingPopular = getState().popular.popular.results;

      if (page > 1) {
        const updatedResults = [...existingPopular, ...data.results];
        dispatch(
          setFetchPopular({
            ...data,
            results: updatedResults,
          })
        );
      } else {
        dispatch(setFetchPopular(data));
      }

      console.log("🚀 ~ fetchPopular ~ new state:", getState().popular.popular);
    } catch (error) {
      console.log("🚀 ~ fetchPopular ~ error:", error);
    }
  };

export default popularSlice.reducer;
