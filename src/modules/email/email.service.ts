import config from '../../config';
import { confirmEmailUserTemplate } from '../../email-templates';
import AppError from '../../errors/AppError';
import {
  checkDomain,
  createJWTToken,
  detectSpam,
  generateSecret,
  sanitizeEmailBody,
} from '../../utils';
import { sendEmail } from '../../utils/sendEmail';
import { IEmail } from './email.interface';
import emailModel from './email.model';

const sendEmailService = async (payload: IEmail) => {
  const { email, name, projectDetails, service, serviceType } = payload;

  const isSanitized = sanitizeEmailBody(
    projectDetails,
    email,
    name,
    service,
    serviceType,
  );

  if (!isSanitized) {
    throw new AppError(400, 'Email body contains malicious content.');
  }

  // check is spam content included
  const spamMessage = detectSpam(projectDetails, name, email);

  if (spamMessage) {
    throw new AppError(400, 'Email body contains spam content.');
  }

  const isDomainExists = await checkDomain(email);

  if (!isDomainExists) {
    throw new AppError(400, 'Invalid Email Domain.');
  }

  // check this user already send a request or not;

  const requestAlreadyExists = await emailModel
    .findOne({ email })
    .sort({ createdAt: -1 });

  if (requestAlreadyExists) {
    const fiveMinutesInMs = 5 * 60 * 1000;

    const currentTime = new Date().getTime();
    const lastRequestTime = new Date(requestAlreadyExists.createdAt).getTime();
    const nextAllowedTime = lastRequestTime + fiveMinutesInMs;

    console.log(currentTime < nextAllowedTime);

    if (currentTime < nextAllowedTime) {
      const remainingTime = Math.ceil((nextAllowedTime - currentTime) / 1000);
      throw new AppError(
        400,
        `You already sent a request. Please wait ${remainingTime} seconds before sending another request.`,
      );
    }
  }

  const result = await emailModel.create(payload);

  if (!result.createdAt) {
    new AppError(404, 'Failed to save the request.');
  }

  const jwtPayload = {
    email: result.email,
    name: result.email,
    createdAt: result.createdAt,
  };

  const secret = generateSecret(64);

  // create token for confirm request.
  const token = createJWTToken({ payload: jwtPayload, secret });

  // url for confirm request.
  const url = `${config.confirmRequestClientLink}?token=${token}`;

  const emailTemplate = confirmEmailUserTemplate({
    projectDetails,
    service,
    serviceType,
    userName: name,
    link: url,
  });

  // Send email to the user
  sendEmail({
    to: email,
    subject: `Confirm Your Service Request - ${service}`,
    html: emailTemplate,
  });

  return result;
};

export const emailService = {
  sendEmailService,
};
