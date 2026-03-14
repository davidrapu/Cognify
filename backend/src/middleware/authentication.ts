import type { Request, Response, NextFunction } from "express";
import type errorsType = require("../types/errorsType");
const jwt = require("jsonwebtoken");

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (token == undefined ) {
    const err: errorsType.HttpError = new Error("No token provided");
    err.status = 401;
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.id;
    next();
  } catch (e) {
    const err: errorsType.HttpError = new Error("Invalid token");
    err.status = 403;
    return next(err);
  }finally{
    res.end()
  }
}

module.exports = authenticateToken;
