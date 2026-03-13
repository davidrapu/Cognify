const express = require("express");
const {
  login,
  register,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

const router = express.Router();

// Routers

// @desc Login user
// @route POST /auth/login
router.post("/login", login);

// @desc Register user
// @route POST /auth/register
router.post("/register", register);

// @desc Logout user
// @route POST /auth/logout
router.post("/logout", logout);

// @desc Refresh access token
// @route GET /auth/refresh
router.get("/refresh", refreshToken);

module.exports = router;