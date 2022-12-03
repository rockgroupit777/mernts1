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
const User = model<UserDocument, UserModel>("User", userSchema);
export default User;