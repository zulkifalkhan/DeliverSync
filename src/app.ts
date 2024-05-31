import express from 'express';
import dotenv from 'dotenv';
import connectDB from './framework/initDatabase';

dotenv.config();

const app = express();
const port = 3000;

// Connect to database
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
