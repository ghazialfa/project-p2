import { fetchMovies } from "@/features/movies/movieSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Movie_card } from "./movie_card";
import { fetchPopular } from "@/features/movies/popularSlice";

export default function Movie_body({ position }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const popular = useSelector((state) => state.popular);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (position === "popular") {
      dispatch(fetchPopular(page));
    } else {
      dispatch(fetchMovies({ page }));
    }
    console.log("🚀 ~ useEffect ~ page:", page);
  }, [dispatch, position, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 lg:gap-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                {position === "popular" ? "Popular Movies" : "Latest Movies"}
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
