import { PrismaClient } from "../generated/prisma/client";
const { prisma }: { prisma: PrismaClient } = require("../lib/prisma");
import { type QuizSessionDataType } from "../../types/dataTypes";

// Create a new quiz session
async function createNewQuizSession(sessionData: QuizSessionDataType, userId: string) {
  return prisma.quizSession.create({
    data: {
      ...sessionData,
      userId,
    },
  });
}

async function getQuizSessionsByUserId(userId: string) {
  return prisma.quizSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

module.exports = {
  createNewQuizSession,
  getQuizSessionsByUserId,
};