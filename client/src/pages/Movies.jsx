import Movie_body from "@/components/movies/movie_body";
import { Movie_carousel } from "@/components/movies/movie_carousel";
import React from "react";

export default function Movies() {
  return (
    <>
      <Movie_carousel />
      <Movie_body />
    </>
  );
}
