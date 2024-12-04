import cors from 'cors';
import express from 'express';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// Parsers
app.use(express.json());

export default app;
