import cors from 'cors';
import express from 'express';
import router from './routes';
import { globalErrorHandler, notFound } from './middlewares';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// Parsers
app.use(express.json());

// Routes
app.use(router);

// Middlewares
app.use(globalErrorHandler);

// 404 Not found middleware
app.use(notFound);

export default app;
