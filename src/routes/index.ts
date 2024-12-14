import { Router } from 'express';
import { emailRoutes } from '../modules/email/email.routes';

const router = Router();

const moduleRoutes = [{ path: '/api/v1', route: emailRoutes }];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
