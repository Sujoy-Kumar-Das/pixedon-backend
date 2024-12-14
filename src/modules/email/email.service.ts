import { IEmail } from './email.interface';
import EmailModel from './email.model';

const sendEmailService = async (payload: IEmail) => {
  const result = await EmailModel.create(payload);
  return result;
};

export const emailService = {
  sendEmailService,
};
