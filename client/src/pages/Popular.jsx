import Movie_body from "@/components/movies/movie_body";
import { Movie_carousel } from "@/components/movies/movie_carousel";
import { fetchPopular } from "@/features/movies/popularSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Popular() {
  const dispatch = useDispatch();
  const popular = useSelector((state) => state.popular);
  console.log("🚀 ~ Movie_carousel ~ popular:", popular);

  useEffect(() => {
    dispatch(fetchPopular());
  }, []);
  return (
    <>
      <Movie_carousel movies={popular.popular.results} />
      <Movie_body position="popular" />
    </>
  );
}
