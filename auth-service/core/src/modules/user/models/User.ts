import mongoose, { Schema } from 'mongoose';

export interface User {
  username: string;
  password: string;

  name: string;
  email: string;
  phone: string;
};

const schema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },

  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
});

export const UserModel = mongoose.model('Users', schema);
