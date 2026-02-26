const jwt = require("jsonwebtoken");
const users = require("../data/users.json");
import type { HttpError } from "../types/errorsType";
require("dotenv").config();

function generateToken(user: any) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45m" });
}

function generateRefreshToken(user: any) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}
async function getUser(email: string) {
  // This function will get the user details from the database using the email. For now, we are just getting the user details from the json file.
  const user = users.find((user: any) => user.email === email);
  return user;
}

async function getUsers() {
  return users;
}

async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  // This function will create a new user and store it in the database. For now, we are just updating the json file with the new user details.

  //   in the case theres already a user
  const user = await getUser(email);
  if (user) {
    const err: HttpError = new Error("User already exists");
    err.status = 409;
    throw err;
  }
  const newUser = {
    id: (await getUsers()).length + 1,
    firstName,
    lastName,
    email,
    password,
  };
  users.push(newUser);
  return { id: newUser.id };
}

async function userRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  try {
    const userData = await createUser(firstName, lastName, email, password);
    const accessToken = generateToken(userData);
    const refreshToken = generateRefreshToken(userData);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    throw error;
  }
}

async function userLogin(email: string, password: string) {
  // Find user by email
  const user = await getUser(email);

  if (user === undefined) {
    const err: HttpError = new Error("Invalid email");
    err.status = 400;
    throw err;
  }

  /*
  Password recieved will be an encrypted string so decryption is done here.
  This functinoality will be implemented in the future when we have a database to store user details and encrypted passwords. For now, we are just comparing the password recieved with the password in the json file.
  */
  if (user.password !== password) {
    const err: HttpError = new Error("Invalid password");
    err.status = 400;
    throw err;
  }

  // Password and email are valid, allow user to login and return the user first name, last name and email

  const userDetails = {
    id: user.id,
  };
  const accessToken = generateToken(userDetails);
  const refreshToken = generateRefreshToken(userDetails);
  return { accessToken, refreshToken };
}

function verifyRefreshToken(refreshToken: string) {
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
    return generateToken({ id: payload.id });
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

async function logout(){
}

module.exports = {
  generateToken,
  generateRefreshToken,
  userLogin,
  userRegister,
  verifyRefreshToken,
};
