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

// Define the interface for the User document
interface IUser extends Document {
    email: string;
  username: string;
  email: string; // Example additional field
  password: string; // Example additional field
    hashPassword: (password: string) => Promise<void>;
  comparePassword: (password: string) => Promise<boolean>;
    firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  permissions: [string];  
}
