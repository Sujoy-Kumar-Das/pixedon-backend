import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { globalErrorHandler, notFound } from './middlewares';
import router from './routes';
const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

// Parsers
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(router);

// Middlewares
app.use(globalErrorHandler);

// 404 Not found middleware
app.use(notFound);

export default app;
