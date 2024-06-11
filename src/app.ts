import express from "express";

import dotenv from "dotenv";
import initDatabase from "./framework/initDatabase";
import { startOrderConsumer } from "./services/queue";
import { connectRabbitMQ } from "./framework/initRabbitMQ";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
initDatabase();

connectRabbitMQ(() => {
  startOrderConsumer();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
