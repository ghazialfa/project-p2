import { fetchMovies } from "@/features/movies/movieSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Movie_card } from "./movie_card";
import { fetchPopular } from "@/features/movies/popularSlice";

export default function Movie_body({ position }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  console.log("🚀 ~ Movie_body ~ movies:", movies.list.results);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const popular = useSelector((state) => state.popular);
  console.log("🚀 ~ Movie_carousel ~ popular:", popular);

  useEffect(() => {
    dispatch(fetchPopular());
  }, []);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 lg:gap-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                {position === "popular" ? "Popular Movies" : "Lastest Movies"}
              </h2>
            </div>
            {position === "popular" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {popular.popular &&
                  popular.popular.results &&
                  popular.popular.results.map((movie) => (
                    <Movie_card movie={movie} key={movie.id} />
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {movies.list &&
                  movies.list.results &&
                  movies.list.results.map((movie) => (
                    <Movie_card movie={movie} key={movie.id} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
