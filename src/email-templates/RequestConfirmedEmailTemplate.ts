import config from '../config';

export interface IConfirmEmailTemplateProps {
  userName: string;
  service: string;
  serviceType: string;
}

export const RequestConfirmedEmailTemplate = ({
  userName,
  service,
  serviceType,
}: IConfirmEmailTemplateProps) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Request Confirmed</title>
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f6fb;
      color: #333333;
    }
    .email-container {
      max-width: 650px;
      margin: 2rem auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
      border: 1px solid #e1e4e8;
    }
    .header {
      background: linear-gradient(90deg, #4a90e2, #407ff0);
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .content {
      padding: 20px;
      line-height: 1.6;
    }
    .content h2 {
      color: #407ff0;
      margin-bottom: 15px;
      font-size: 20px;
    }
    .content p {
      font-size: 16px;
      margin: 10px 0;
      color: #666666;
    }
    .button-container {
      text-align: center;
      margin: 25px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(90deg, #4a90e2, #407ff0);
      color: #ffffff;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0px 6px 12px rgba(64, 127, 240, 0.4);
      transition: background 0.3s ease, transform 0.2s ease;
    }
    .button:hover {
      background: linear-gradient(90deg, #6699f3, #5890f0);
      transform: translateY(-2px);
    }
    .footer {
      background-color: #f9f9f9;
      color: #777777;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      border-top: 1px solid #e1e4e8;
    }
    .footer a {
      color: #407ff0;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Request Confirmed</h1>
    </div>
    <div class="content">
      <h2>Hello, ${userName}</h2>
      <p>We’re excited to let you know that your service request has been successfully confirmed. Below are the details of your request:</p>
      <ul>
        <li><strong>Service:</strong> ${service}</li>
        <li><strong>Service Type:</strong> ${serviceType}</li>
      </ul>
      <p>Our team will contact you shortly to discuss further details and begin working on your request. If you have any questions in the meantime, feel free to reach out to us.</p>
      <div class="button-container">
        <a href="${config.clientURL}" class="button">Visit Our Website</a>
      </div>
      <p>Thank you for trusting PIXEDON. We’re committed to delivering the highest quality service and ensuring your satisfaction.</p>
    </div>
    <div class="footer">
      <p>© 2024 PIXEDON</p>
      <p><a href="${config.clientURL}">Visit Our Website</a> | <a href="mailto:support@pixedon.com">Contact Support</a></p>
    </div>
  </div>
</body>
</html>
`;
