import type { Request, Response, NextFunction } from "express";
const {
  userLogin,
  userRegister,
  verifyRefreshToken,
} = require("../services/auth.service");
import type { HttpError } from "../types/errorsType";
const { configDotenv } = require("dotenv");
if (process.env.ENV !== "production") {
  configDotenv({ path: "../../../.env" });
}

async function login(req: Request, res: Response, next: NextFunction) {
    if (
      !req.body ||
      !req.body.email ||
      !req.body.password
    ) {
      const err: HttpError = new Error("Missing required fields");
      err.status = 400;
      return next(err);
    }
    
  try {
    const { accessToken, refreshToken, user } = await userLogin(
      req.body.email,
      req.body.password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: process.env.ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600000, // 7 days
      path: "/"
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: process.env.ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600000, // 7 days
    })
    res.status(200).json({ message: "Login successful", user });
  } catch (error: any) {
    next(error);
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.latitude || !req.body.longitude) {
    const err: HttpError = new Error("Missing required fields");
    err.status = 400;
    return next(err);
  }

  try {
    const { accessToken, refreshToken, user } = await userRegister(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.latitude,
      req.body.longitude
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: process.env.ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600000, // 7 days
      path: "/"
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: process.env.ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600000, // 7 days
      path: "/"
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
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

    // clear refresh token cookie and access token cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: process.env.ENV === "production" ? "strict" : "lax",
      path: "/"
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: process.env.ENV === "production" ? "strict" : "lax",
      path: "/"
    });


    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log(req.cookies.refreshToken)
    const {accessToken, user} = await verifyRefreshToken(req.cookies.refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      sameSite: process.env.ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600000, // 7 days
    })
    res.status(200).json({ message: "Access token refreshed", user });
  } catch (error) {
    // console.log(error)
    next(error);
  }
}

module.exports = { login, register, logout, refreshToken };
