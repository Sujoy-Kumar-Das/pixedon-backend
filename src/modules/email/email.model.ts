import mongoose from 'mongoose';
import { IService } from './service.type';

const services = [
  IService.DE,
  IService.DM,
  IService.EC,
  IService.GD,
  IService.WD,
];

// Create the schema for IEmail
const emailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    projectDetails: {
      type: String,
      required: [true, 'Project details are required'],
      trim: true,
    },
    service: {
      type: String,
      enum: services,
      required: [true, 'Service type is required'],
    },
    serviceType: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },
  },
  { timestamps: true },
);

// Create the model
const emailModel = mongoose.model('email', emailSchema);

export default emailModel;
