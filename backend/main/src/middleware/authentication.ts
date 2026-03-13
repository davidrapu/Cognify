import type { Request, Response, NextFunction } from "express";
import type errorsType = require("../types/errorsType");
const jwt = require("jsonwebtoken");

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;

  if (token == null) {
    const err: errorsType.HttpError = new Error("No token provided");
    err.status = 401;
    return next(err);
  };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err : any, user: any) => {
      if (err) {
        const err: errorsType.HttpError = new Error("Invalid token");
        err.status = 403;
        return next(err);
      }
      
      req.user = user;
      next();
    });
}

module.exports = authenticateToken;