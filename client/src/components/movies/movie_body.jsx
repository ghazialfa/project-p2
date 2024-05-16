import { fetchMovies } from "@/features/movies/movieSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Movie_card } from "./movie_card";

export default function Movie_body() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  console.log("🚀 ~ Movie_body ~ movies:", movies.list.results);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 lg:gap-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Trending Movies
              </h2>
              <Link className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.list &&
                movies.list.results &&
                movies.list.results.map((movie) => (
                  <Movie_card movie={movie} key={movie.id} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
