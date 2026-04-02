import type { Request, Response, NextFunction } from "express";
import type dataTypes = require("../types/dataTypes");
import { GameName } from "../database/generated/prisma/enums";
import { HttpError } from "../types/errorsType";
const {
  getSessionsData,
  getSessionsDataByGameName,
  getSessionDataById,
  addNewSession,
} = require("../services/sessions.service");

/**
 * @desc Create a new session and save it to the data file
 * @route POST /sessions
 */
async function addSession(req: Request, res: Response, next: NextFunction) {
  // Logic to add a new session
  try {
    if (!req.body) {
      const err: HttpError = new Error("Request body is required");
      err.status = 400;
      return next(err);
    }
    const { gameName, correct, incorrect, totalTime, domain } = req.body;

    await addNewSession(
      gameName,
      correct,
      incorrect,
      totalTime,
      domain,
      req.user,
    );
    res.status(201).json({ message: "Session created successfully" });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc Get all sessions from the data file
 * @route GET /sessions
 * @route GET /sessions/gameName
 */
async function getSessions(req: Request, res: Response, next: NextFunction) {
  try {
    const { sessions, stats } = await getSessionsData(req.user);
    res.status(200).json({
      message: "Sessions retrieved successfully",
      data: { sessions, stats },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc Get all sessions from the data file
 * @route GET /sessions/:gameName
 */
async function getSessionsByGameName(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validGameNames = Object.values(GameName);
    let gameName = req.params.gameName as string;
    gameName = gameName.split("-").join("_").toUpperCase(); // Convert the game name to uppercase and replace hyphens with spaces to match the enum values

    if (gameName && !validGameNames.includes(gameName as GameName)) {
      const err: HttpError = new Error("Invalid game name");
      err.status = 400;
      return next(err);
    }

    const { sessions, stats } = await getSessionsDataByGameName(
      req.user,
      gameName.toUpperCase() as GameName,
    );
    res.status(200).json({
      message: "Sessions retrieved successfully",
      data: { sessions, stats },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc Get a specific session by ID from the data file
 * @route GET /sessions/:id
 */
async function getSession(req: Request, res: Response, next: NextFunction) {
  // Call the service to get all the sessions based of the user ID and session ID from the request parameters
  try {
    const userId = req.user;
    const sessionId = parseInt(req.params?.id as string);
    const session = await getSessionDataById(userId, sessionId);
    res
      .status(200)
      .json({ message: "Session retrieved successfully", data: session });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addSession,
  getSessions,
  getSession,
  getSessionsByGameName,
};
