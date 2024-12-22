import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { userController } from './user.controller';
import { userValidationSchema } from './user.validation.schema';

const router = Router();

// Create a new user
router.post(
  '/user/moderator',
  validateRequest(userValidationSchema.createUserSchema),
  userController.createModeratorController,
);

// Get all users
router.get('/users', userController.getAllUsersController);

// Get a single user by ID
router.get('/user/:id', userController.getSingleUserController);

// Update user information
router.patch('/user/:id', userController.updateUserInfoController);

// Block a user
router.patch('/user/:id/block', userController.blockUserController);

// Unblock a user
router.patch('/user/:id/unblock', userController.unBlockUserController);

// Delete a user
router.delete('/user/:id', userController.deleteUserController);

export const userRoutes = router;
