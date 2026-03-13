const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
const cookieParser = require("cookie-parser");
const sessionsRouter = require("./routers/sessions.router");
const authentication = require("./middleware/authentication");
require("dotenv").config();

const app = express();

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_FRONTEND_URL
    : "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/sessions", authentication, sessionsRouter);

// Routers

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
