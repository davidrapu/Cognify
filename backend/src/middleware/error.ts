import { type Request, type Response, type NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Full error:", err); // Log the entire error object for debugging
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res
      .status(500)
      .send({ message: "Something went wrong!", error: err.message });
  }
};

module.exports = errorHandler;
