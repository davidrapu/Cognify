import { hash } from "node:crypto";

const {prisma} = require("../lib/prisma");
async function createNewUser(firstName: string, lastName: string, email: string, hash: string) {
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      hash
    },
    select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
    }
  });
}

async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        hash: true
    }
  });
}

async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
    }
  });
}

async function getUsers() {
  return prisma.user.findMany()
}

async function deleteUserByEmail(email: string) {
  return prisma.user.delete({
    where: { email },
  });
}

module.exports = {
    createNewUser,
    getUserByEmail,
    getUserById,
    getUsers,
    deleteUserByEmail
}