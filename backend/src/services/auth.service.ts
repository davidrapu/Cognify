const users = require("../data/users.json");
import type { HttpError } from "../types/errorsType";

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
  return newUser
}

async function getUser(email: string) {
  // This function will get the user details from the database using the email. For now, we are just getting the user details from the json file.
  const user = users.find((user: any) => user.email === email);
  return user;
}

async function getUsers() {
  return users;
}

async function login(email: string, password: string) {
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
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  return userDetails;
}

async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  try {
    const userData = await createUser(firstName, lastName, email, password);
    return {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  login,
  register,
};
