import { HttpError } from "@/types/errorsType";
import {Request, Response, NextFunction} from "express";
const {generateQuiz, createQuizSession} = require("../services/quiz.service")

async function getQuizData(req: Request, res: Response, next: NextFunction) {
  const {city, country} = req.query;
  try {
    if (!city || !country) {
      const err: HttpError = new Error("Invalid request query. 'city' and 'country' are required.");
      err.status = 400;
      throw err;
    }

    const quizData = await generateQuiz(city, country);
    res.status(200).json(quizData);
  } catch (error) {
    next(error);
  }
}

async function submitQuizResults(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body || typeof req.body.score !== "number") {
      const err: HttpError = new Error("Invalid request body. 'score' must be a number.");
      err.status = 400;
      throw err;
    }
    const { score} = req.body;
    createQuizSession(score, req.user);
    res.status(200).json({ message: "Quiz results submitted successfully" });
  } catch (error) {
    next(error);
  }
}



module.exports = {
  getQuizData,
  submitQuizResults,
};