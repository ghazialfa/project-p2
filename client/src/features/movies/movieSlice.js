"use strict";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
});

export default movieSlice.reducer;
