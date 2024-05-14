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

      const movie = await tmdbAPI.get(`/movie/${tmdbId}`);
      res.status(200).json(movie.data);
    } catch (error) {
      console.log("🚀 ~ Movies_ctrl ~ getDetail ~ error:", error);
      next(error);
    }
  }
}

module.exports = Movies_ctrl;
