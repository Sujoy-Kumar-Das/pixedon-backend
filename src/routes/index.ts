import { Router } from 'express';
import { emailRoutes } from '../modules/email/email.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  { path: '', route: emailRoutes },
  { path: '', route: userRoutes },
];

moduleRoutes.map((route) => router.use(`/api/v1${route.path}`, route.route));

export default router;
