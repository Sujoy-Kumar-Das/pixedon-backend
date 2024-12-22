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

export const authController = {
  loginController,
};
