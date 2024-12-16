import config from '../config';

export interface IAdminNotificationTemplateProps {
  userName: string;
  userEmail: string;
  service: string;
  serviceType: string;
  projectDetails: string;
  submittedAt: string;
}

export const adminNotificationTemplate = ({
  userName,
  userEmail,
  service,
  serviceType,
  projectDetails,
  submittedAt,
}: IAdminNotificationTemplateProps) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Notification</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9fafc;
      color: #2b2d42;
    }
    .email-container {
      max-width: 700px;
      margin: 2rem auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid #ebedf0;
    }
    .header {
      background: linear-gradient(135deg, #6a11cb, #2575fc);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      margin: 0;
      font-weight: 700;
    }
    .content {
      padding: 30px 20px;
      line-height: 1.8;
    }
    .content h2 {
      color: #6a11cb;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .content p {
      font-size: 16px;
      color: #4a4e69;
      margin: 15px 0;
    }
    .details-card {
      background: #f9fafc;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #ebedf0;
      margin: 20px 0;
    }
    .details-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .details-card ul li {
      margin-bottom: 10px;
      font-size: 15px;
      color: #333;
      display: flex;
      justify-content: space-between;
    }
    .details-card ul li strong {
      font-weight: 600;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #6a11cb, #2575fc);
      color: #ffffff;
      padding: 14px 40px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      box-shadow: 0px 5px 10px rgba(101, 78, 255, 0.3);
      transition: all 0.3s ease;
    }
    .button:hover {
      background: linear-gradient(135deg, #7b2dfc, #3a80fc);
      box-shadow: 0px 8px 15px rgba(101, 78, 255, 0.4);
    }
    .footer {
      background-color: #f3f4f6;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #71717a;
    }
    .footer a {
      color: #6a11cb;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>New Service Request Notification</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Hello, Admin</h2>
      <p>You have received a new service request. Please find the details below:</p>

      <!-- Details Card -->
      <div class="details-card">
        <ul>
          <li><strong>User Name:</strong> ${userName}</li>
          <li><strong>User Email:</strong> ${userEmail}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Service Type:</strong> ${serviceType}</li>
          <li><strong>Project Details:</strong> ${projectDetails}</li>
          <li><strong>Submitted At:</strong> ${submittedAt}</li>
        </ul>
      </div>

      <!-- Call to Action -->
      <div class="button-container">
        <a href="${config.frontendUrl}" class="button">View in Admin Panel</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2024 PIXEDON. All rights reserved.</p>
      <p>
        <a href="${config.frontendUrl}">Admin Dashboard</a> |
        <a href="mailto:support@pixedon.com">Contact Support</a>
      </p>
    </div>
  </div>
</body>
</html>`;
