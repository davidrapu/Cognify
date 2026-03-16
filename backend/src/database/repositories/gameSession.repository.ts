import { type SessionDataType } from '../../types/dataTypes';
import { PrismaClient } from '../generated/prisma/client';

const {prisma}: {prisma:PrismaClient} = require('../lib/prisma');


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
            domain: sessionData.domain
        }
    })

}

// get all game sessions for a user
async function getGameSessions(userId: string) {
    return prisma.gameSession.findMany({
        where: {
            userId: userId
        },
        omit: {
            userId: true
        },
        take: 10
    })
}


module.exports = {
  createGameSession,
  getGameSessions
};