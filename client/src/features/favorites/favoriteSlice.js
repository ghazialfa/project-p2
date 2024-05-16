"use strict";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import Swal from "sweetalert2";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFetchFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
  },
});

export const { setFetchFavorites, addFavorite } = favoriteSlice.actions;

export const fetchFavorites = () => async (dispatch) => {
  try {
    const { data } = await api.get("/favorites", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(setFetchFavorites(data));
  } catch (error) {
    console.log("🚀 ~ error:", error);
    const { message } = error.response.data;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }
};

// export const addFavoriteToDB = (id) => async (dispatch) => {

// }

export default favoriteSlice.reducer;
