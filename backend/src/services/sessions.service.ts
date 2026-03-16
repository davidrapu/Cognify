import { HttpError } from "../types/errorsType";
import type dataTypes = require("../types/dataTypes");
import type errorsType = require("../types/errorsType");
import { GameName } from "../database/generated/prisma/enums";
const {
  createGameSession,
  getGameSessions,
  getGameSessionsStatistics,
  getGameSessionsStatisticsByGameType,
  getGameSessionsByGameType
} = require("../database/repositories/gameSession.repository");


async function getSessionsData(userId: string, gameName?: GameName) {
  if (gameName) {console.log(gameName)}
  const [sessions, statistics] = await Promise.all([
    gameName ? getGameSessionsByGameType(userId, gameName) : getGameSessions(userId),
    gameName ? getGameSessionsStatisticsByGameType(userId, gameName) : getGameSessionsStatistics(userId)
  ]);
  if (sessions.length === 0) {
    const err: errorsType.HttpError = new Error("No sessions found for the given user ID");
    err.status = 404;
    throw err;
  }
    const averageScore =
      sessions.length > 0
        ? sessions.reduce((sum: number, s: dataTypes.SessionDataType) => sum + s.correct, 0) / sessions.length
        : 0;

  return {sessions, stats:{...statistics, averageScore: Math.round(averageScore * 10) / 10}};
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
