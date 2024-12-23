import { z } from 'zod';

const passwordSchema = z
  .string({ required_error: 'Password is required.' })
  .min(8, { message: 'Password should be at least 8 characters long.' })
  .max(32, { message: 'Password should not be longer than 32 characters.' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter.',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[@$!%*?&]/, {
    message: 'Password must contain at least one special character.',
  });

const loginUser = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Please enter a valid email.' }),
    password: z.string({ required_error: 'Password is required.' }),
  }),
});

const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required.' }),
    newPassword: z
      .string({ required_error: 'New password is required.' })
      .min(8, { message: 'Password should be at least 8 characters long.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[@$!%*?&]/, {
        message: 'Password must contain at least one special character.',
      })
      .max(32, {
        message: 'Password should not be longer than 32 characters.',
      }),
  }),
});

const forgotPassword = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Please enter a valid email.' }),
  }),
});

const resetPassword = z.object({
  body: z
    .object({
      password: passwordSchema,
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'New password must be different from the old password.',
      path: ['confirmPassword'],
    }),
});

export const authValidationSchema = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
