const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(cookieParser());



// Routers

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
