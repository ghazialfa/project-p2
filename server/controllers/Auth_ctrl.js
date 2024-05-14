"use strict";
const { User } = require("../models");

class Auth_ctrl {
  //* ─── Register ────────────────────────────────────────────────────────
  static async register(req, res, next) {
    try {
      const { username, email, password, adult } = req.body;
      await User.create({ username, email, password, adult });

      res
        .status(201)
        .json({ message: "User Created", user: { username, email } });
    } catch (error) {
      console.log("🚀 ~ Auth_ctrl ~ register ~ error:", error);
      next(error);
    }
  }
}

module.exports = Auth_ctrl;
