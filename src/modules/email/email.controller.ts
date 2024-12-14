import { catchAsync, sendResponse } from '../../utils';
import { emailService } from './email.service';

const sendEmailController = catchAsync(async (req, res) => {
  const result = await emailService.sendEmailService(req.body);

  sendResponse(res, {
    data: result,
    message:
      'Thank you for reaching out! We appreciate your interest and will connect with you promptly.',
    statusCode: 200,
    success: true,
  });
});

export const emailController = {
  sendEmailController,
};
