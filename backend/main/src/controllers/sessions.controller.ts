import type { Request, Response, NextFunction } from "express";
import type dataTypes = require("../types/dataTypes");
const {getSessionsData, getSessionDataById, addNewSession} = require("../services/sessions.service");
const { SessionSchema } = require("../schemas/session.schema");


/**
 * @desc Create a new session and save it to the data file
 * @route POST /sessions
 */
async function addSession(req: Request, res: Response, next: NextFunction) {
  // Logic to add a new session
  try {
        const sessionData: dataTypes.SessionData = SessionSchema.parse(req.body);
        await addNewSession(sessionData);
        res.status(201).json({ message: "Session created successfully" });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get all sessions from the data file
 * @route GET /sessions
 */
async function getSessions(req: Request, res: Response, next: NextFunction) {
  try {
    // Call the service to get all the sessions based of the user ID
    const userId = req.user.id;
    const sessions = await getSessionsData(userId);
    res.status(200).json({message: "Sessions retrieved successfully", data: sessions});
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
  try{
    const userId = req.user.id;
    const sessionId = parseInt(req.params?.id as string);
    const session = await getSessionDataById(userId, sessionId);
    res.status(200).json({message: "Session retrieved successfully", data: session});
  }catch (error) {
    next(error);
  }
}

module.exports = {
  addSession,
  getSessions,
  getSession,
};
