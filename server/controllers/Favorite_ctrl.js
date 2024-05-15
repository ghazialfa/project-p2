"use strict";
const tmdbAPI = require("../helpers/axios");
const { Movie, Favorite } = require("../models");

class Favorite_ctrl {
  //* ─── Add Favorite ────────────────────────────────────────────────────
  static async addFavorite(req, res, next) {
    try {
      const { tmdbId } = req.params;
      const { id } = req.user;

      const movie = await Movie.findOrCreate({
        where: { tmdbId },
        default: { tmdbId },
      });

      const favorite = await Favorite.findOrCreate({
        where: { UserId: id, MovieId: movie[0].id },
        default: { UserId: id, MovieId: movie[0].id },
      });

      res.status(200).json(favorite[0]);
    } catch (error) {
      console.log("🚀 ~ Favorite_ctrl ~ addFavorite ~ error:", error);
      next(error);
    }
  }

  //* ─── Get Favorite ────────────────────────────────────────────────────
  static async getFavorites(req, res, next) {
    try {
      const { id } = req.user;

      const favorites = await Favorite.findAll({
        where: { UserId: id },
        include: Movie,
      });

      let movies = [];

      for (const favorite of favorites) {
        const { Movie } = favorite;
        const { data } = await tmdbAPI.get(`/movie/${Movie.tmdbId}`);
        movies.push(data);
      }

      const output = movies.map((el) => ({
        id: el.id,
        title: el.title,
        backdrop_path: el.backdrop_path,
        genres: el.genres,
        original_language: el.original_language,
        overview: el.overview,
        vote_count: el.vote_count,
        vote_average: el.vote_average,
        poster_path: el.poster_path,
        release_date: el.release_date,
        adult: el.adult,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      res.status(200).json(output);
    } catch (error) {
      console.log("🚀 ~ Favorite_ctrl ~ getFavorite ~ error:", error);
      next(error);
    }
  }
}

module.exports = Favorite_ctrl;
