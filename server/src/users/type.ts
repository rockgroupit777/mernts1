import { Document, Model } from 'mongoose';
export interface UserDocument extends Document {
    email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  permissions: [string];
  matchesPassword: (password: string) => Promise<boolean>;
}
export interface UserModel extends Model<UserDocument> {
    hash: (password: string) => Promise<string>;
  }