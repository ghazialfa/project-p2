import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/axios";
import { Movie_card } from "@/components/movies/movie_card";

export default function Genres() {
  const { id } = useParams();
  const [dataMovie, setDataMovie] = useState([]);
  console.log("🚀 ~ Genres ~ dataMovie:", dataMovie);

  const fetchMovies = async () => {
    try {
      const { data } = await api.get(`/genres/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("🚀 ~ fetchMovies ~ data:", data);

      setDataMovie(data.results);
    } catch (error) {
      console.log("🚀 ~ fetchMovies ~ error:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [id]);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid gap-6 md:gap-8 lg:gap-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 md:text-5xl lg:text-6xl mb-12">
              Genre
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {dataMovie.map((movie) => (
                <Movie_card movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
