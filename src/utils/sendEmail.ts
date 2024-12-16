import nodemailer from 'nodemailer';
import config from '../config';

interface IEmail {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: IEmail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.authEmailUser,
      pass: config.authEmailPassword,
    },
  });

  await transporter.sendMail({
    from: config.authEmailUser,
    to,
    subject,
    text: '',
    html,
  });
};
