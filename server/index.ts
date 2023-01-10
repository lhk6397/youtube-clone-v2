import "./db";
import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT || 5000}!`);
});
