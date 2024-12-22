import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { authController } from './auth.controller';
import { authValidationSchema } from './auth.validation-schema';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidationSchema.loginValidationSchema),
  authController.loginController,
);

export const authRoutes = router;
