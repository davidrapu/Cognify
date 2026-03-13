const {prisma} = require("../lib/prisma");
async function createNewUser(firstName: string, lastName: string, email: string, password: string) {
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password
    },
    select: {
        id: true
    }
  });
}

async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
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
    getUsers,
    deleteUserByEmail
}