"use strict";
const tmdbAPI = require("../helpers/axios");
const { Movie, Favorite } = require("../models");

class Favorite_ctrl {
  //* ─── Add Favorite ────────────────────────────────────────────────────
  static async addFavorite(req, res, next) {
    try {
      const { tmdbId } = req.params;
      const { id } = req.user;

      const { data } = await tmdbAPI.get(`/movie/${tmdbId}`);

      const movie = await Movie.findOrCreate({
        where: { name: data.title },
        default: { name: data.title },
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

      // favorites.map(({Movie}) => {
      //   const movie = await tmdbAPI.get("")
      // })

      res.status(200).json(favorites);
    } catch (error) {
      console.log("🚀 ~ Favorite_ctrl ~ getFavorite ~ error:", error);
      next(error);
    }
  }
}

module.exports = Favorite_ctrl;
