const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { login, register, logout, refreshToken } = require("./controller/auth.controller");

const app = express();

const allowedOrigin = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_FRONTEND_URL : "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routers
app.post("/login", login )
app.post("/register", register)
app.post("/logout", logout)
app.get("/refresh", refreshToken)


app.use(notFound);
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
