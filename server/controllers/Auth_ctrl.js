"use strict";
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
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

  //* ─── Login ───────────────────────────────────────────────────────────
  static async login(req, res, next) {
    try {
      const { emailOrUsername, password } = req.body;

      if (!emailOrUsername) {
        throw { status: 400, message: "Email or Username is required" };
      }

      if (!password) {
        throw { status: 400, message: "Password is required" };
      }

      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });

      if (!user) {
        throw { status: 401, message: "Invalid email/username or password" };
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw { status: 401, message: "Invalid email/username or password" };
      }

      const access_token = createToken({ id: user.id });

      res.status(200).json({
        message: "Login Success",
        user: { username: user.username, email: user.email },
        access_token,
      });
    } catch (error) {
      console.log("🚀 ~ login ~ error:", error);
      next(error);
    }
  }
}

module.exports = Auth_ctrl;
