import { Schema } from 'mongoose';

const options = {discriminatorKey: 'type'};

export const UserSchema = new Schema(
  {
    username: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: [{
        type: String,
        required: true,
        enum: ['admin', 'student', 'professor']
    }],
  },
  { timestamps: true }
);