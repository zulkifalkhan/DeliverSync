import express from "express";

import dotenv from "dotenv";
import initDatabase from "./framework/initDatabase";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
initDatabase();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
