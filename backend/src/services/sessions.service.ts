import { HttpError } from "../types/errorsType";
import type dataTypes = require("../types/dataTypes");
import type errorsType = require("../types/errorsType");
const {
  createGameSession,
  getGameSessions,
} = require("../database/repositories/gameSession.repository");

const data: string[] = ["po"];

async function getSessionsData(userId: string) {
  const userGameSessions: dataTypes.SessionDataType[] = await getGameSessions(userId);
  if (userGameSessions.length === 0) {
    const err: errorsType.HttpError = new Error("No sessions found for the given user ID");
    err.status = 404;
    throw err;
  }
  return userGameSessions;
}

async function getSessionDataById(userId: number, sessionId: number) {
  // check if that user ID exists in the data file, showing if the user has any sessions recorded
  // if it does return the session with that session ID
  // otherwise throw an error saying no session found for that user ID and session ID
  // const session = data.sessions.find((session: any) => session.userId === userId && session.id === sessionId);
  // if (!session) {
  //   const err: errorsType.HttpError = new Error("No session found for the given user ID and session ID");
  //   err.status = 404;
  //   throw err;
  // }
  return 0;
}

async function addNewSession(sessionData: dataTypes.SessionDataType, userId: string) {
  try {
    await createGameSession(sessionData, userId);
  } catch (error) {
    const err: HttpError = error instanceof Error ? error : new Error(String(error));
    err.status = 500;
    throw err;
  }
}

module.exports = {
  getSessionsData,
  getSessionDataById,
  addNewSession,
};
