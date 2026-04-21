const jwt = require("jsonwebtoken");
const { createNewUser, getUserByEmail, getUserById } = require("../database/repositories/user.repository");
const { createRefreshToken, getRefreshToken, deleteRefreshToken} = require("../database/repositories/refreshToken.repository");
const bcrypt = require("bcrypt");
import type { HttpError } from "../types/errorsType";

function generateToken(userId: any) {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

async function generateRefreshToken(userId: any) {
  const token = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  await createRefreshToken(userId, token);
  return token;
}

async function encryptPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function getLocationFromLatLng(latitude: number, longitude: number) {
  try {
    const resp = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          "User-Agent": "Cognify/1.0 (daverapu47@yahoo.com)", // required
        },
      },
    );

    if (!resp.ok) throw new Error(`Nominatim fetch failed: ${resp.status}`);

    const data = await resp.json();

    const city =
      data.address.city || data.address.town || data.address.village || null;
    const country = data.address.country || null;

    return { city, country };
  } catch (err) {
    console.error("Error fetching location:", err);
    return { city: null, country: null }; // fail gracefully
  }
};
async function getLocationFromIP(ip: string) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();

    console.log("ip-api response:", data);

    if (data.status === "fail") {
      console.warn("ip-api failed for IP:", ip, "Reason:", data.message);
      return { country: null, city: null };
    }

    return {
      country: data.country ?? null,
      city: data.city ?? null,
    };
  } catch (error) {
    console.error("getLocationFromIP error:", error);
    return { country: null, city: null };
  }
}

async function userRegister(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  latitude?: number,
  longitude?: number,
  ip?: string
) {

  // console.log(latitude, longitude);
  const encryptedPassword = await encryptPassword(password);
  let city = null;
  let country = null;
  // console.log("Latitude and Longitude:", latitude, longitude, "IP:", ip);

  if (latitude && longitude) {
    const location = await getLocationFromLatLng(latitude, longitude);
    city = location.city;
    country = location.country;
  } else if (ip) {
    const location = await getLocationFromIP(ip);
    console.log("Location from IP:", location);
    city = location.city;
    country = location.country;
  }

  // console.log(city, country);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    const err: HttpError = new Error("Email already in use");
    err.status = 409;
    throw err;
  }
  const userData = await createNewUser(firstName, lastName, email, encryptedPassword, city, country);
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

async function logoutUser(refreshToken: string) {
  await deleteRefreshToken(refreshToken);
}

module.exports = {
  generateToken,
  generateRefreshToken,
  userLogin,
  userRegister,
  verifyRefreshToken,
  logoutUser
};
