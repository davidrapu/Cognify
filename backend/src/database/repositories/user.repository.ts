import { PrismaClient } from "../generated/prisma/client";

const {prisma}: {prisma:PrismaClient} = require("../lib/prisma");

async function createNewUser(
  firstName: string,
  lastName: string,
  email: string,
  hash: string,
  city: string,
  country: string
) {
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      city,
      country,
      hash,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      city: true,
      country: true,
    },
  });
}

async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      country: true,
      city: true,
      email: true,
      hash: true,
    },
  });
}

async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      country: true,
      city: true,
    },
  });
}

async function getUsers() {
  return prisma.user.findMany();
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
};
