"use strict";
const tmdbAPI = require("../helpers/axios");

class Movies_ctrl {
  //* ─── Get All ─────────────────────────────────────────────────────────
  static async getAll(req, res, next) {
    try {
      const { search } = req.query;

      let movies;
      if (search) {
        movies = await tmdbAPI.get("/search/movie", {
          params: {
            query: search,
          },
        });
      } else {
        movies = await tmdbAPI.get("/discover/movie");
      }

      // console.log("🚀 ~ Movies_ctrl ~ getAll ~ movies:", movies);
      res.status(200).json(movies.data);
    } catch (error) {
      console.log("🚀 ~ Movies_ctrl ~ getAll ~ error:", error);
      next(error);
    }
  }

  //* ─── Get Popular ───────────────────────────────────────────────────────────
  static async getPopular(req, res, next) {
    try {
      const { data } = await tmdbAPI.get("/movie/popular");
      // console.log("🚀 ~ Movies_ctrl ~ getAll ~ data:", data);
      res.status(200).json(data);
    } catch (error) {
      console.log("🚀 ~ Movies_ctrl ~ getAll ~ error:", error);
      next(error);
    }
  }

  //* ─── Get Detail ──────────────────────────────────────────────────────
  static async getDetail(req, res, next) {
    try {
      const { tmdbId } = req.params;

      const { data } = await tmdbAPI.get(`/movie/${tmdbId}`);
      res.status(200).json({
        id: data.id,
        title: data.title,
        backdrop_path: data.backdrop_path,
        genres: data.genres,
        original_language: data.original_language,
        overview: data.overview,
        vote_count: data.vote_count,
        vote_average: data.vote_average,
        poster_path: data.poster_path,
        release_date: data.release_date,
        adult: data.adult,
      });
    } catch (error) {
      console.log(
        "🚀 ~ Movies_ctrl ~ getDetail ~ error:",
        error.response.data.status_message
      );
      next(error);
    }
  }
}

module.exports = Movies_ctrl;
