const express = require("express");
const cors = require("cors");
const auth = require("./routers/auth");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/notFound");
import type { Request, Response } from "express";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "backend" });
});

// Routers
app.use("/api/auth", auth);

app.use(notFound);
app.use(errorHandler);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
