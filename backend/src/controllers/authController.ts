import type { Request, Response, NextFunction } from "express";
import type { HttpError } from "../types/errorsType";
const users = require("../data/users.json");

// @desc Get user from data of user details given
// @route POST /api/auth/login
const loginUser = (req: Request, res: Response, next: NextFunction) => {
  // Find user by email
  const user = users.find((user: any) => user.email === req.body.username);

  if (user === undefined) {
    const error: HttpError = new Error("Invalid email");
    error.status = 404;
    return next(error);
  }

  if (user.password !== req.body.password) {
    const error: HttpError = new Error("Invalid password");
    error.status = 404;
    return next(error);
  }

  return res.status(200).json({ message: "Login user", user });
};

// @desc Register user with details given
// @route POST /api/auth/register
// @access Public
const registerUser = (req: Request, res: Response) => {
  res.status(201).json({ message: "Register user" });
};

module.exports = {
  loginUser,
  registerUser,
};
