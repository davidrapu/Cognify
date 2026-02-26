import type {
  Request,
  Response,
  NextFunction,
} from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res
      .status(500)
      .send({ message: "Something went wrong!", error: err.message });
  }
};

module.exports = errorHandler;
