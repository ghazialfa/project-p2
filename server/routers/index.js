"use strict";
const express = require("express");
const Auth_ctrl = require("../controllers/Auth_ctrl");
const router = express.Router();

router.post("/register", Auth_ctrl.register);
router.post("/login", Auth_ctrl.login);

router.use("/movies", require("./movies"));

module.exports = router;
