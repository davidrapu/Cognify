const jwt = require("jsonwebtoken");
const { createNewUser, getUserByEmail, getUserById } = require("../../database/repositories/user.repository");
const bcrypt = require("bcrypt");
import type { HttpError } from "@/types/errorsType";

function generateToken(userId: any) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(userId: any) {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
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
  try {
    const encryptedPassword = await encryptPassword(password);
    const userData = await createNewUser(firstName, lastName, email, encryptedPassword);
    const accessToken = generateToken(userData.id);
    const refreshToken = generateRefreshToken(userData.id);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user : userData
    };
  } catch (error) {
    throw error;
  }
}

async function userLogin(email: string, password: string) {
  // Find user by email
  const user = await getUserByEmail(email);

  if (user === undefined) {
    const err: HttpError = new Error("Invalid email");
    err.status = 400;
    throw err;
  }

  const isValid = await bcrypt.compare(password, user.hash);
  if (!isValid) {
    const err: HttpError = new Error("Invalid password");
    err.status = 400;
    throw err;
  }

  // Password and email are valid, allow user to login and return the user first name, last name and email

  const userDetail = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };

  const accessToken = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  return { accessToken, refreshToken, user: userDetail };
}

async function verifyRefreshToken(refreshToken: string) {
  try {
    // If no refresh token, return 401
    if (!refreshToken) {
      const err: HttpError = new Error("No refresh token provided");
      err.status = 401;
      throw err;
    }

    // Verify refresh token exist in db
    // const verifiedToken = await verifyRefreshToken(refreshToken);
    // if not exist, return 403

    // Verify refresh token is valid
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // throws if invalid
    const user = await getUserById(payload.id); // get user data from db using user id

    if (!user) {
      const err: HttpError = new Error("User not found");
      err.status = 404;
      throw err;
    }

    const accessToken = generateToken(payload.id);

    return { accessToken, user };
    
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

async function logout() {}

module.exports = {
  generateToken,
  generateRefreshToken,
  userLogin,
  userRegister,
  verifyRefreshToken,
};
