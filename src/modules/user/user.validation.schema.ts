import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(3, { message: 'Name is required.' }),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Please provide a valid email.' }),
    designation: z.enum(['WD', 'GD', 'DM', 'DE', 'EC'], {
      message: 'Designation is required.',
    }),
  }),
});

export const userValidationSchema = {
  createUserSchema,
};
