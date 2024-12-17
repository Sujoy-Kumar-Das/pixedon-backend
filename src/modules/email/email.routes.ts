import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { emailController } from './email.controller';
import { emailValidationSchema } from './email.validation.schema';

const router = Router();

router.post(
  '/email',
  validateRequest(emailValidationSchema.sendEmailValidationSchema),
  emailController.sendEmailController,
);

router.post('/email-confirm', emailController.confirmEmailController);

export const emailRoutes = router;
