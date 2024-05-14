"use strict";
const express = require("express");
const Reviews_ctrl = require("../controllers/Reviews_ctrl");

const router = express.Router();

router.get("/:tmdbId", Reviews_ctrl.getReviews);

module.exports = router;
