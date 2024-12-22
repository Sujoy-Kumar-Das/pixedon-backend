import { Router } from 'express';
import { auth, validateRequest } from '../../middlewares';
import { USER_ROLE } from '../user/user.constant';
import { authController } from './auth.controller';
import { authValidationSchema } from './auth.validation-schema';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidationSchema.loginUser),
  authController.loginController,
);

router.post(
  '/change-password',
  validateRequest(authValidationSchema.changePassword),
  auth(USER_ROLE.admin, USER_ROLE.moderator, USER_ROLE.superAdmin),
  authController.changePasswordController,
);

export const authRoutes = router;
