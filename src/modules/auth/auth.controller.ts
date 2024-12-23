import { catchAsync, sendResponse } from '../../utils';
import setCookie from '../../utils/setCookie';
import { authService } from './auth.service';

const loginController = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.loginService(
    req.body,
  );

  // set the access token to the cookie
  setCookie({
    res,
    key: 'accessToken',
    value: accessToken,
    options: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
  });

  // set the refresh token to the cookie
  setCookie({
    res,
    key: 'refreshToken',
    value: refreshToken,
    options: {
      maxAge: 10 * 24 * 60 * 60 * 1000,
    },
  });

  sendResponse(res, {
    data: { accessToken },
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

const refreshTokenController = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const { accessToken } = await authService.refreshToken(refreshToken);

  // set the access token to the cookie
  setCookie({
    res,
    key: 'accessToken',
    value: accessToken,
    options: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    },
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Access token retrieve successfully.',
    data: accessToken,
  });
});

export const authController = {
  loginController,
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
  refreshTokenController,
};
