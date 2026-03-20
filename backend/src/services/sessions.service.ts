import { HttpError } from "../types/errorsType";
import type dataTypes = require("../types/dataTypes");
import type errorsType = require("../types/errorsType");
import { Domain, GameName } from "../database/generated/prisma/enums";
const {
  createGameSession,
  getGameSessions,
  getGameSessionsStatistics,
  getGameSessionsStatisticsByGameType,
  getGameSessionsByGameType,
} = require("../database/repositories/gameSession.repository");
const { SessionSchema } = require("../schemas/session.schema");

async function getSessionsData(userId: string) {
  const [sessions, statistics] = await Promise.all([
    // If a game name is provided, get the sessions and statistics for that game type, otherwise get all sessions and statistics for the user
    getGameSessions(userId),
    getGameSessionsStatistics(userId),
  ]);

  if (sessions.length === 0) {
    const err: errorsType.HttpError = new Error(
      "No sessions found for the given user ID",
    );
    err.status = 404;
    throw err;
  }
  const averageScore =
    sessions.length > 0
      ? sessions.reduce(
          (sum: number, s: dataTypes.SessionDataType) => sum + s.correct,
          0,
        ) / sessions.length
      : 0;

  return {
    sessions,
    stats: { ...statistics, averageScore: Math.round(averageScore * 10) / 10 },
  };
}
async function getSessionsDataByGameName(userId: string, gameName: GameName) {
  const [sessions, statistics] = await Promise.all([
    // If a game name is provided, get the sessions and statistics for that game type, otherwise get all sessions and statistics for the user
    getGameSessionsByGameType(userId, gameName),
    getGameSessionsStatisticsByGameType(userId, gameName),
  ]);

  if (sessions.length === 0) {
    const err: errorsType.HttpError = new Error(
      "No sessions found for the given user ID and game name",
    );
    err.status = 404;
    throw err;
  }
  const averageScore =
    sessions.length > 0
      ? sessions.reduce(
          (sum: number, s: dataTypes.SessionDataType) => sum + s.correct,
          0,
        ) / sessions.length
      : 0;

  return {
    sessions,
    stats: { ...statistics, averageScore: Math.round(averageScore * 10) / 10 },
  };
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

function standardDeviation(values: number[]): number {
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
  const avgSquaredDiff =
    squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
  return Math.sqrt(avgSquaredDiff);
}

async function addNewSession(
  gameName: GameName,
  correct: number,
  incorrect: number,
  totalTime: { time: number; correct: boolean }[],
  domain: Domain,
  userId: string,
) {

  if (!gameName || correct === undefined || incorrect === undefined || !totalTime || !domain) {
    const err: HttpError = new Error("Missing required session data");
    err.status = 400;
    throw err;
  }

  const totalDuration = totalTime.reduce((sum, item) => sum + item.time, 0);

  const data: dataTypes.SessionDataType = {
    gameName,
    correct,
    incorrect,
    reactionTimeAvg: totalDuration / totalTime.length,
    reactionTimeStd: standardDeviation(totalTime.map((item) => item.time)),
    duration: totalDuration,
    domain,
  };
  const validationResult = SessionSchema.safeParse(data);

  if (!validationResult.success) {
    const err: HttpError = new Error("Invalid session data");
    err.status = 400;
    throw err;
  }
  await createGameSession(data, userId);
}

module.exports = {
  getSessionsData,
  getSessionDataById,
  addNewSession,
  getSessionsDataByGameName,
};
