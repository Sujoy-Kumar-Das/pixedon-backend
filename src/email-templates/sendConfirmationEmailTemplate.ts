import config from '../config';

interface IConfirmationEmailParams {
  user: string;
  role: string;
  email: string;
  password: string;
}

export const sendConfirmationEmailTemplate = ({
  user,
  role,
  email,
  password,
}: IConfirmationEmailParams) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Moderator Role Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 30px;
        max-width: 600px;
        margin: 0 auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #4caf50;
        font-size: 24px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .btn {
        display: inline-block;
        background-color: #4caf50;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #777;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h1>Moderator Role Confirmation</h1>
      <p>Dear ${user},</p>
      <p>
        We are pleased to inform you that you have been successfully added as a
        <strong>${role}</strong> on our platform!
      </p>
      <p>Your account has been created with the following details:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please change your password for security reasons. You can reset it by clicking the button below:</p>

      <a href="${config.frontendUrl}/reset-password" class="btn">Reset Password</a>

      <p>If you have any questions, feel free to reach out to us.</p>

      <p class="footer">
        Thank you for being a part of our platform. We look forward to working
        with you!
      </p>
    </div>
  </body>
</html>
`;
