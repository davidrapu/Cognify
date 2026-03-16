import { PrismaClient } from '../generated/prisma/client';

const {prisma}: {prisma:PrismaClient} = require('../lib/prisma');


const createRefreshToken = async (userId: string, token: string) => {
    return prisma.refreshToken.create({
        data: {
            userId,
            token
        }
    })
}

const getRefreshToken = async (token: string) => {
    return prisma.refreshToken.findUnique({
        where: {
            token
        }
    })
}

module.exports = {
    createRefreshToken,
    getRefreshToken
}