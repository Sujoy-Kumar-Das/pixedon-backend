import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.db_url,
  frontendUrl: process.env.local_frontend_url,
  node_env: process.env.node_env,
  authEmailUser: process.env.auth_user_email,
  authEmailPassword: process.env.auth_user_password,
  clientURL: process.env.client_url,
  neverBounceApiKey: process.env.never_bounce_api_key,
  confirmRequestClientLink: process.env.confirm_request_client_link,
  requestSecret: process.env.request_secret,
  saltRound: process.env.salt_round,
};
