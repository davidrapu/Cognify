const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
const cookieParser = require("cookie-parser");
const sessionsRouter = require("./routers/sessions.router");
const authRouter = require("./routers/auth.router");
const authentication = require("./middleware/authentication");
const predictionsRouter = require("./routers/predictions.router");
const quizRouter = require("./routers/quiz.router");

const {configDotenv} = require("dotenv")
if (process.env.ENV !== "production") {
  configDotenv({ path: "../.env" });
}

const app = express();
const allowedOrigin =
  process.env.ENV === "production"
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

// Routers

app.use("/auth", authRouter);
app.use("/sessions", authentication, sessionsRouter);
app.use("/predictions", authentication, predictionsRouter);
app.use("/quiz", quizRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
