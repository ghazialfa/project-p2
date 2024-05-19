import Movie_body from "@/components/movies/movie_body";
import { Movie_carousel } from "@/components/movies/movie_carousel";
import { fetchMovies } from "@/features/movies/movieSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  console.log("🚀 ~ Movie_body ~ movies:", movies.list.results);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <>
      <Movie_carousel movies={movies.list.results} />
      <Movie_body />
    </>
  );
}
