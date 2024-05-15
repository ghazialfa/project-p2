"use strict";
const express = require("express");
const Favorite_ctrl = require("../controllers/Favorite_ctrl");
const router = express.Router();

router.get("/", Favorite_ctrl.getFavorites);
router.post("/:tmdbId", Favorite_ctrl.addFavorite);

module.exports = router;
