"use strict";

import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./features/movies/movieSlice";
import genreReducer from "./features/genres/genreSlice";
import moviePosterReducer from "./features/movies/moviePosterSlice";
import popularReducer from "./features/movies/popularSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    genres: genreReducer,
    moviePoster: moviePosterReducer,
    popular: popularReducer,
  },
});
