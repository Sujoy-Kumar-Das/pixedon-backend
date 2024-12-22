import { model, Schema } from 'mongoose';
import hashPassword from '../../utils/hashPassword';
import { services } from '../email/service';
import { USER_ROLE } from './user.constant';
import { IUser } from './user.interface';

// Mongoose Schema for IUser
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Nam is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [
        true,
        'Email is required. Please provide a valid email address.',
      ],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => /\S+@\S+\.\S+/.test(value),
        message: 'Please provide a valid email format.',
      },
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLE),
        message: 'Role must be one of the following: {VALUE}.',
      },
    },
    designation: {
      type: String,
      enum: services,
      required: [true, 'Designation is required.'],
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// hash password middleware
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await hashPassword(user.password as string);

  next();
});

// method for remove password and sensitive fields
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.isBlocked;
  return user;
};

// Create and Export the User Model
const UserModel = model<IUser>('User', UserSchema);

export default UserModel;