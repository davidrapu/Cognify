import { Request, Response, NextFunction } from "express";

declare module "express" {
  interface Request {
    user?: {
      id: number;
    };
  }
}
