import type { Request, Response, NextFunction } from "express";
import type dataTypes = require("../types/dataTypes");
import { GameName } from "../database/generated/prisma/enums";
import { HttpError } from "../types/errorsType";
const {
  getSessionsData,
  getSessionDataById,
  addNewSession,
} = require("../services/sessions.service");
const { SessionSchema } = require("../schemas/session.schema");

/**
 * @desc Create a new session and save it to the data file
 * @route POST /sessions
 */
async function addSession(req: Request, res: Response, next: NextFunction) {
  // Logic to add a new session
  try {
    const sessionData: dataTypes.SessionDataType = SessionSchema.parse(req.body);
    await addNewSession(sessionData, req.user);
    res.status(201).json({ message: "Session created successfully" });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc Get all sessions from the data file
 * @route GET /sessions
 * @route GET /sessions?gameName=gameName
 */
async function getSessions(req: Request, res: Response, next: NextFunction) {
  try {
    const validGameNames = Object.values(GameName);
    const gameName = req.query.gameName as string;

    if (gameName && !validGameNames.includes(gameName.toUpperCase() as GameName)) {
      const err: HttpError = new Error("Invalid game name");
      err.status = 400;
      return next(err);
    }

    const { sessions, stats } = await getSessionsData(req.user, gameName.toUpperCase() as GameName);
    res.status(200).json({ message: "Sessions retrieved successfully", data: { sessions, stats } });
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
    const userId = req.user.id;
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
  getSession
};
