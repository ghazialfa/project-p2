import { useState } from "react";
import { Movie_card } from "@/components/movies/movie_card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecommendation,
  setFetchRecommendation,
} from "@/features/movies/movieSlice";

export default function Ai() {
  const dispatch = useDispatch();
  // dispatch(setFetchRecommendation(true));
  const [inputData, setInputData] = useState("");
  // console.log("🚀 ~ Ai ~ inputData:", inputData);

  const recommendation = useSelector((state) => state.movies.recommendation);
  // console.log("🚀 ~ Ai ~ recommendation:", recommendation);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputData ? dispatch(setFetchRecommendation(true)) : null;
    dispatch(fetchRecommendation({ userRequest: inputData }));
    setInputData("");
  };

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid gap-6 md:gap-8 lg:gap-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 md:text-5xl lg:text-6xl mb-12">
              Ask AI for Recommendations
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center mb-6">
                <input
                  type="text"
                  value={inputData}
                  name="userRequest"
                  id="userRequest"
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="Enter your preferences..."
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Get Recommendations
                </button>
              </div>
            </form>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {recommendation &&
                recommendation.map((movie, index) => (
                  <Movie_card movie={movie} key={index} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
