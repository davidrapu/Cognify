const jwt = require("jsonwebtoken");
const { createNewUser, getUserByEmail, getUserById } = require("../database/repositories/user.repository");
const { createRefreshToken, getRefreshToken } = require("../database/repositories/refreshToken.repository");
const bcrypt = require("bcrypt");
import type { HttpError } from "../types/errorsType";

function generateToken(userId: any) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45m" });
}

async function generateRefreshToken(userId: any) {
  const token = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  await createRefreshToken(userId, token);
  return token;
}

async function encryptPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function userRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const encryptedPassword = await encryptPassword(password);
  const userData = await createNewUser(firstName, lastName, email, encryptedPassword);
  const accessToken = generateToken(userData.id);
  const refreshToken = await generateRefreshToken(userData.id);
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user : userData
  };
}

async function userLogin(email: string, password: string) {
  // Find user by email
  const user = await getUserByEmail(email);
  // console.log("User found:", user);

  if (user === undefined) {
    const err: HttpError = new Error("Invalid email");
    err.status = 401
    ;
    throw err;
  }

  const isValid = await bcrypt.compare(password, user.hash);

  if (!isValid) {
    const err: HttpError = new Error("Invalid password");
    err.status = 401
    ;
    throw err;
  }

  const userDetail = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  const accessToken = generateToken(user.id);
  const refreshToken = await generateRefreshToken(user.id);
  return { accessToken, refreshToken, user: userDetail };
}

async function verifyRefreshToken(refreshToken: string, userId: string) {
  // If no refresh token, return 401
  if (!refreshToken) {
    const err: HttpError = new Error("No refresh token provided");
    err.status = 401;
    throw err;
  }
  // Verify refresh token is valid
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // throws if invalid

  // Verify refresh token exist in db
  const verifiedToken = await getRefreshToken(refreshToken);
  // if not exist, return 403
  if (!verifiedToken) {
    const err: HttpError = new Error("Invalid refresh token");
    err.status = 403;
    throw err;
  }
  const user = await getUserById(payload.id); // get user data from db using user id

  if (!user) {
    const err: HttpError = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const accessToken = generateToken(payload.id);

  return { accessToken, user };
}

async function logout() {}

module.exports = {
  generateToken,
  generateRefreshToken,
  userLogin,
  userRegister,
  verifyRefreshToken,
};
