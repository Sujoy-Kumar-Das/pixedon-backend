import AppError from '../../errors/AppError';
import { checkDomain, detectSpam, sanitizeEmailBody } from '../../utils';
import { IEmail } from './email.interface';

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

  // const emailTemplate = confirmEmailUserTemplate({
  //   projectDetails,
  //   service,
  //   serviceType,
  //   userName: name,
  // });

  // const adminEmailTemplate = adminNotificationTemplate({
  //   projectDetails,
  //   service,
  //   serviceType,
  //   submittedAt: '',
  //   userEmail: email,
  //   userName: name,
  // });

  // const result = await EmailModel.create(payload);

  // if (!result.createdAt) {
  //   new AppError(404, 'Failed to save the request.');
  // }

  // // Send email to the user
  // sendEmail({
  //   to: email,
  //   subject: `Your Service Request Confirmation - ${service}`,
  //   html: emailTemplate,
  // });

  // // Send email to the admin
  // sendEmail({
  //   to: config.authEmailUser as string,
  //   subject: `New Service Request Submitted by ${name} - ${service}`,
  //   html: adminEmailTemplate,
  // });

  // return result;
};

export const emailService = {
  sendEmailService,
};
