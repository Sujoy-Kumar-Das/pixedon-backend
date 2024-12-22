import { catchAsync, sendResponse } from '../../utils';
import { userService } from './user.service';

const createModeratorController = catchAsync(async (req, res) => {
  const result = await userService.createModerator(req.body);
  sendResponse(res, {
    data: result,
    message: `${result.name.toUpperCase()} are added as a moderator successfully.`,
    statusCode: 200,
    success: true,
  });
});

const getAllUsersController = catchAsync(async (req, res) => {
  const result = await userService.getAllUser();
  sendResponse(res, {
    data: result,
    message: 'Users retrieved successfully.',
    statusCode: 200,
    success: true,
  });
});

const getSingleUserController = catchAsync(async (req, res) => {
  const result = await userService.getSingleUser(req.params.id);
  sendResponse(res, {
    data: result,
    message: 'User retrieved successfully.',
    statusCode: 200,
    success: true,
  });
});

const updateUserInfoController = catchAsync(async (req, res) => {
  const result = await userService.updateUserInfo(req.params.id, req.body);
  sendResponse(res, {
    data: result,
    message: 'User information updated successfully.',
    statusCode: 200,
    success: true,
  });
});

const blockUserController = catchAsync(async (req, res) => {
  const result = await userService.blockUser(req.params.id);
  sendResponse(res, {
    data: result,
    message: 'User blocked successfully.',
    statusCode: 200,
    success: true,
  });
});

const unBlockUserController = catchAsync(async (req, res) => {
  const result = await userService.unBlockUser(req.params.id);
  sendResponse(res, {
    data: result,
    message: 'User unblocked successfully.',
    statusCode: 200,
    success: true,
  });
});

const deleteUserController = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  sendResponse(res, {
    data: null,
    message: 'User deleted successfully.',
    statusCode: 200,
    success: true,
  });
});

export const userController = {
  createModeratorController,
  getAllUsersController,
  getSingleUserController,
  updateUserInfoController,
  blockUserController,
  unBlockUserController,
  deleteUserController,
};
