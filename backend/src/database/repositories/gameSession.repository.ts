import { type SessionDataType } from '../../types/dataTypes';
import { PrismaClient } from '../generated/prisma/client';

const {prisma}: {prisma:PrismaClient} = require('../lib/prisma');


// CRUD operations for game sessions



// Create a new game session
async function createGameSession(sessionData: SessionDataType, userId: string) {
    return prisma.gameSession.create({
        data: {
            ...sessionData,
            userId: userId
        }
    })

}

// get all game sessions for a user

async function getGameSessionsByUserId(userId: string) {
    return prisma.gameSession.findMany({
        where: {
            userId: userId
        },
        take: 10
    })
}


module.exports = {
  createGameSession,
  getGameSessionsByUserId
};