import type { Request, Response, NextFunction } from "express";
const { login, register } = require("../services/auth.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// @desc Get user from data of user details given
// @route POST /api/auth/login
async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userData = await login(req.body.email, req.body.password);
    return res
      .status(200)
      .json({ message: "User Logged In Successfully", user: userData });
  } catch (error) {
    next(error);
  }
}

// @desc Register user with details given
// @route POST /api/auth/register
// @access Public
/**
 * user details: name, email, password
 * password will be encrypted and stored in the database. For now, we are just storing the password as it is in the json file.
 */
async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userData = await register(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
    );
    return res
      .status(201)
      .json({ message: "User registered successfully", user: userData });
  } catch (error: any) {
    next(error);
  }
}

module.exports = {
  loginUser,
  registerUser,
};
