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

export const fetchPopular = () => async (dispatch) => {
  try {
    const { data } = await api.get("/movies/popular", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log("🚀 ~ fetchPopular ~ data:", data);
    dispatch(setFetchPopular(data));
  } catch (error) {
    console.log("🚀 ~ fetchPopular ~ error:", error);
  }
};

export default popularSlice.reducer;
