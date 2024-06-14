/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [false, 'username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },

  emailValidated: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String
  },
  profilePicture: {
    type: String
  },
  country: { type: String },
  emailVerificationToken: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },

  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  }
});

authSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
  }
});

export const AuthModel = mongoose.model('Auth', authSchema);
