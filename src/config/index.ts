import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.db_url,
  frontendUrl: process.env.local_frontend_url,
  node_env: process.env.node_env,
};
