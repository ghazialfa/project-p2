"use strict";
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import Swal from "sweetalert2";

const initialState = {
  list: [],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    setFetchGenres: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFetchGenres } = genreSlice.actions;

export const fetchGenres = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.get("/genres", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setFetchGenres(data));
    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
      const errMsg = error.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errMsg,
      });
    }
  };
};

export default genreSlice.reducer;
