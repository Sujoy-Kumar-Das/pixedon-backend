export function resetPasswordEmailTemplate({
  recipientName,
  resetLink,
}: {
  recipientName: string;
  resetLink: string;
}) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.8;
            color: #0E1B51; /* text.primary */
            background-color: #F5F8FE; /* background.primary */
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #FFFFFF; /* background.accent */
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #407FF0; /* primary */
            color: #FFFFFF; /* text.accent */
            text-align: center;
            padding: 25px 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px 20px;
          }
          .content p {
            margin: 15px 0;
            font-size: 16px;
          }
          .button {
            display: inline-block;
            background-color: #407FF0; /* primary */
            color: #FFFFFF; /* text.accent */
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
          }
          .button:hover {
            background-color: #6699F3; /* secondary */
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #6E7697; /* text.secondary */
            padding: 15px 20px;
            background: #F6F6F6; /* background.secondary */
            border-top: 1px solid #ddd;
          }
          .footer a {
            color: #407FF0; /* primary */
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Dear ${recipientName},</p>
            <p>We received a request to reset your password. To proceed, please click the button below:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or <a href="#">contact support</a> if you have concerns.</p>
            <p>For your security, this link will expire in 24 hours.</p>
            <p>Best regards,<br>The Support Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Pixedon. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
}
