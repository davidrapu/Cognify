import type { Request, Response, NextFunction } from "express";
const { userLogin, userRegister, verifyRefreshToken } = require("../service/auth.service");
import type { HttpError } from "../types/errorsType";

// Store all refresh tokens in a db when db integrated

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken } = await userLogin(
      req.body.email,
      req.body.password,
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2700000, // 45 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 3600000, // 7 days
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    next(error);
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  // Example register logic
  try {
    const { accessToken, refreshToken } = await userRegister(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2700000, // 45 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 3600000, // 7 days
    });
    return res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const err: HttpError = new Error("No refresh token provided");
      err.status = 400;
      throw err;
    }
    // Delete refresh token from db when db integrated
  
    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  
    res.status(200).json({ message: "Logout successful" });
  }
  catch(error){
    next(error);
  }
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try{
    const accessToken = verifyRefreshToken(req.cookies.refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2700000, // 45 minutes
    });
    res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, register, logout, refreshToken };
