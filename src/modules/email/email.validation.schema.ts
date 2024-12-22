import { z } from 'zod';
import { services } from './service';

// Create the Zod schema
const sendEmailValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }),

    email: z.string().trim().email({ message: 'Email is required.' }),

    projectDetails: z
      .string()
      .trim()
      .min(1, { message: 'Project details are required' }),

    service: z.enum(services, { message: 'Service type is required' }),

    serviceType: z.enum(['free', 'premium']).default('free'),
  }),
});

export const emailValidationSchema = {
  sendEmailValidationSchema,
};
