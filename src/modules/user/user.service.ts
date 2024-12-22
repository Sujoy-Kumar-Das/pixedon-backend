import { sendConfirmationEmailTemplate } from '../../email-templates';
import AppError from '../../errors/AppError';
import { generateRandomPassword } from '../../utils';
import { sendEmail } from '../../utils/sendEmail';
import { USER_ROLE } from './user.constant';
import { IUser } from './user.interface';
import UserModel from './user.model';

// create admin service
const createAdmin = async (payload: IUser) => {
  const { email, name } = payload;

  const admins = await UserModel.find({
    role: USER_ROLE.admin,
  }).estimatedDocumentCount();

  if (admins > 3) {
    throw new AppError(
      404,
      'Failed to create admin. You have reached the limit.',
    );
  }

  const user = await UserModel.findOne({ email });

  if (user) {
    throw new AppError(
      400,
      `${name} already have an account as ${user.role} role`,
    );
  }

  // set role
  payload.role = USER_ROLE.admin;

  const password = generateRandomPassword();

  // const set password
  payload.password = password;

  const result = await UserModel.create(payload);

  console.log(payload);

  if (!result._id) {
    throw new AppError(400, 'Failed to created user.');
  }

  const emailTemplate = sendConfirmationEmailTemplate({
    user: result.name,
    email: result.email,
    password,
    role: result.role,
  });

  try {
    sendEmail({
      to: email,
      subject: 'Your Admin Role Confirmation and Account Details',
      html: emailTemplate,
    });
  } catch {
    throw new AppError(400, 'Something went wrong please try again.');
  }
  return result;
};

// create moderator service
const createModerator = async (payload: IUser) => {
  const { email, name } = payload;

  const user = await UserModel.findOne({ email });

  if (user) {
    throw new AppError(
      400,
      `${name} already have an account as ${user.role} role`,
    );
  }

  // set role
  payload.role = USER_ROLE.moderator;

  const password = generateRandomPassword();

  // const set password
  payload.password = password;

  const result = await UserModel.create(payload);

  if (!result._id) {
    throw new AppError(400, 'Failed to created user.');
  }

  const emailTemplate = sendConfirmationEmailTemplate({
    user: result.name,
    email: result.email,
    password,
    role: result.role,
  });

  try {
    sendEmail({
      to: email,
      subject: 'Your Moderator Role Confirmation and Account Details',
      html: emailTemplate,
    });
  } catch {
    throw new AppError(400, 'Something went wrong please try again.');
  }
  return result;
};

const getAllUser = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUser = async (id: string) => {
  const user = UserModel.findById(id);

  if (!user) {
    throw new AppError(404, 'This user is not found.');
  }

  return user;
};

const updateUserInfo = async (id: string, payload: Partial<IUser>) => {
  const user = await UserModel.findById(id);

  if (payload.password) {
    throw new AppError(400, 'You can not update your info with password.');
  }

  if (!user || user.isBlock) {
    throw new AppError(404, 'This user is not found.');
  }

  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const blockUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user || user.isBlock) {
    throw new AppError(404, 'This user is not found.');
  }

  const result = await UserModel.findByIdAndUpdate(
    id,
    { isBlock: true },
    { new: true },
  );

  return result;
};

const unBlockUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError(404, 'This user is not found.');
  }

  if (!user.isBlock) {
    throw new AppError(404, 'This user is already unblocked');
  }

  const result = await UserModel.findByIdAndUpdate(
    id,
    { isBlock: false },
    { new: true },
  );

  return result;
};

const deleteUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user || user.isBlock) {
    throw new AppError(404, 'This user is not found.');
  }

  await UserModel.findByIdAndDelete(id);

  return null;
};

export const userService = {
  createAdmin,
  createModerator,
  getAllUser,
  getSingleUser,
  updateUserInfo,
  blockUser,
  unBlockUser,
  deleteUser,
};
