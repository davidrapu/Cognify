import type { Request, Response, NextFunction } from "express";
const {
  userLogin,
  userRegister,
  verifyRefreshToken,
} = require("../services/auth.service");
import type { HttpError } from "../types/errorsType";

// Store all refresh tokens in a db when db integrated

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken, user } = await userLogin(
      req.body.email,
      req.body.password,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 3600000, // 7 days
    });
    res.status(200).json({ message: "Login successful", user, accessToken });
  } catch (error: any) {
    next(error);
  } finally {
    res.end();
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  // Example register logic
  try {
    const { accessToken, refreshToken, user } = await userRegister(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 3600000, // 7 days
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user, accessToken });
  } catch (error) {
    next(error);
  } finally {
    res.end();
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const err: HttpError = new Error("No refresh token provided");
      err.status = 400;
      throw err;
    }
    // Delete refresh token from db when db integrated

    // clear refresh token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const {accessToken, user} = await verifyRefreshToken(req.cookies.refreshToken);
    res.status(200).json({ message: "Access token refreshed", accessToken, user });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, register, logout, refreshToken };
