import { Movie_card } from "@/components/movies/movie_card";
import { fetchFavorites } from "@/features/favorites/favoriteSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Favorites() {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  console.log("🚀 ~ Favorites ~ favorites:", favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid gap-6 md:gap-8 lg:gap-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 md:text-5xl lg:text-6xl mb-12">
              My Favorite
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {favorites.map((movie) => (
                <Movie_card like={true} movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
