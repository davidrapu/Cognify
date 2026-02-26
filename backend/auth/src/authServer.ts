const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
const cookieParser = require("cookie-parser");
const { login, register, logout, refreshToken } = require("./controller/auth.controller");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(cookieParser());

// Routers
app.post("/login", login )
app.post("/register", register)
app.post("/logout", logout)
app.post("/token", refreshToken)

app.use(notFound);
app.use(errorHandler);

app.listen(6000, () => {
  console.log("Server is running on port 6000");
});
