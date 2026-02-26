import type { Request, Response, NextFunction } from "express";
import type { HttpError } from "../types/errorsType";

function notFound(req: Request, res: Response, next: NextFunction) {
  const error: HttpError = new Error("Route not found");
  error.status = 404;
  return next(error);
}

module.exports = notFound;
