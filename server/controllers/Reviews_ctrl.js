"use strict";

const tmdbAPI = require("../helpers/axios");

class Reviews_ctrl {
  //* ─── Get Movie Reviews ───────────────────────────────────────────────
  static async getReviews(req, res, next) {
    try {
      const { tmdbId } = req.params;
      const { data } = await tmdbAPI.get(`/movie/${tmdbId}/reviews`);

      // console.log("🚀 ~ Reviews_ctrl ~ reviews ~ data:", data);
      res.status(200).json(data);
    } catch (error) {
      console.log("🚀 ~ Reviews_ctrl ~ reviews ~ error:", error);
      next(error);
    }
  }
}

module.exports = Reviews_ctrl;
