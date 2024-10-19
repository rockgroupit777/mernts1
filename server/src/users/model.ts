import { Schema,model } from 'mongoose';
import { hash,compare} from 'bcryptjs';
import { UserDocument,UserModel } from './index';

const userSchema = new Schema({
    email: {
        type: String,
        validate: [
          async (email: string): Promise<boolean> =>
            !(await User.exists({ email })),
          "Email already taken",
        ],
        required: [true, "Email must be required"],
      },
      username: {
        type: String,
        validate: [
          async (username: string): Promise<boolean> =>
            !(await User.exists({ username })),
          "Username already taken",
        ],
        required: [true, "Username must be required"],
      },
      password: {
        type: String,
        required: [true, "Password must be required"],
      },
      firstName: {
        type: String,
        required: [true, "First Name must be required"],
      },
      lastName: {
        type: String,
        required: [true, "Last Name must be required"],
      },
      avatar: {
        type: String,
      },
      role: {
        type: String,
        default: "MEMBER",
      },
      permissions: {
        type: Array,
        default: ["CREATE_OWN", "READ_OWN", "UPDATE_OWN", "DELETE_OWN"],
      },
    },
    { timestamps: true }
)
userSchema.pre("save", async function (this: UserDocument) {
    if (this.isModified("password")) {
      this.password = await User.hash(this.password);
    }
  });
  userSchema.statics.hash = (password: string): Promise<string> =>
    hash(password, 10);
  userSchema.methods.matchesPassword = function (
    this: UserDocument,
    password: string
  ): Promise<boolean> {
    return compare(password, this.password);
  };

//rewwrite
// Define the username validator
const usernameValidator = async (username: string): Promise<boolean> => {
  const userExists = await User.exists({ username });
  return !userExists;
};

/*
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  hashPassword: (password: string) => Promise<void>;
  comparePassword: (password: string) => Promise<boolean>;
}

// Define the username validator
const usernameValidator = async (username: string): Promise<boolean> => {
  const userExists = await User.exists({ username });
  return !userExists;
};

// Define the user schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username must be required"],
    validate: {
      validator: usernameValidator,
      message: "Username already taken",
    },
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email must be required"],
    unique: true,
    validate: {
      validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: [true, "Password must be required"],
  },
});

// Hash the password before saving the user
userSchema.methods.hashPassword = async function (password: string): Promise<void> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  this.password = hashedPassword;
};

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Pre-save middleware to hash the password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    await this.hashPassword(this.password);
  }
  next();
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
*/
const User = model<UserDocument, UserModel>("User", userSchema);
export default User;
