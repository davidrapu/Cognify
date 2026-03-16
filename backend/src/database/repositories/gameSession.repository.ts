import { type SessionDataType } from "../../types/dataTypes";
import { GameName, PrismaClient } from "../generated/prisma/client";

const { prisma }: { prisma: PrismaClient } = require("../lib/prisma");

// Create a new game session
async function createGameSession(sessionData: SessionDataType, userId: string) {
  return prisma.gameSession.create({
    data: {
      userId: userId,
      gameName: sessionData.gameName,
      correct: sessionData.correct,
      incorrect: sessionData.incorrect,
      reactionTimeAvg: sessionData.reactionTimeAvg,
      reactionTimeStd: sessionData.reactionTimeStd,
      duration: sessionData.duration,
      domain: sessionData.domain,
    },
  });
}

// get all game sessions for a user
async function getGameSessions(userId: string) {
  return prisma.gameSession.findMany({
    where: {
      userId: userId,
    },
    omit: {
      userId: true,
    },
    take: 10,
  });
}

// get stats for a user on specific game type
async function getGameSessionsByGameType(userId: string, gameName: GameName) {
  return prisma.gameSession.findMany({
    where: {
      userId: userId,
      gameName: gameName
    },
    omit: {
      userId: true,
    },
    take: 10,
  });
}

// get Statistics for a user
async function getGameSessionsStatistics(userId: string) {
  const [highscore, totals] = await Promise.all([
    prisma.gameSession.aggregate({
      where: { userId },
      _max: { correct: true },
    }),
    prisma.gameSession.aggregate({
      where: { userId },
      _sum: { correct: true, incorrect: true },
    }),
  ]);
  const totalCorrect = totals._sum.correct || 0;
  const totalIncorrect = totals._sum.incorrect || 0;
  const accuracy =
    totalCorrect + totalIncorrect > 0
      ? (totalCorrect / (totalCorrect + totalIncorrect)) * 100
      : 0;
  return {
    highscore: highscore._max.correct || 0,
    accuracy: Math.round(accuracy * 10) / 10, // Round to 1 decimal place
  };
}

// get stats for a user of a game type
async function getGameSessionsStatisticsByGameType(userId: string, gameName: GameName ) {
      const [highscore, totals] = await Promise.all([
        prisma.gameSession.aggregate({
          where: {
            userId, gameName
          },
          _max: { correct: true },
        }),
        prisma.gameSession.aggregate({
          where: {
            userId, gameName
          },
          _sum: { correct: true, incorrect: true },
        }),
      ]);
      const totalCorrect = totals._sum.correct || 0;
      const totalIncorrect = totals._sum.incorrect || 0;
      const accuracy =
        totalCorrect + totalIncorrect > 0
          ? (totalCorrect / (totalCorrect + totalIncorrect)) * 100
          : 0;
      return {
        highscore: highscore._max.correct || 0,
        accuracy: Math.round(accuracy * 10) / 10, // Round to 1 decimal place
      };
}


module.exports = {
  createGameSession,
  getGameSessions,
  getGameSessionsByGameType,
  getGameSessionsStatistics,
  getGameSessionsStatisticsByGameType
};
