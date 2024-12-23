import { catchAsync, sendResponse } from '../../utils';
import { authService } from './auth.service';

const loginController = catchAsync(async (req, res) => {
  const result = await authService.loginService(req.body);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Login successful',
  });
});

const changePasswordController = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.user, req.body);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
  });
});

const forgotPasswordController = catchAsync(async (req, res) => {
  const result = await authService.forgotPassword(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Please check your email.',
    data: result,
  });
});

const resetPasswordController = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await authService.resetPassword(token as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Password reset successfully.',
    data: result,
  });
});

export const authController = {
  loginController,
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
};
