import { createServer } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import AppError from './errors/AppError';

export const server = createServer(app);

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('Database connected successfully.');
    server.listen(config.port, () => {
      console.log(`pixedon app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    throw new AppError(
      404,
      'Server error.Please check your internet connection.',
    );
  }
}

main();
