import { Schema,model } from 'mongoose';
import { PostDocument } from './index';
import { User } from '../users';

const { ObjectId } = Schema.Types;
const postSchema = new Schema(
  {
    title: {
      type: String,
      validate: [
        async (title: string): Promise<boolean> =>
          !(await Post.exists({ title })),
        "Title already exist",
      ],
      required: [true, "Title must be required"],
    },
    alias: {
      type: String,
      validate: [
        async (alias: string): Promise<boolean> =>
          !(await Post.exists({ alias })),
        "Alias already exist",
      ],
      required: [true, "Alias must be required"],
    },
    summary: {
      type: String,
      required: [true, "Summary must be required"],
    },
    content: {
      type: String,
      required: [true, "Content must be required"],
    },
    cover: {
      type: String,
    },
    photos: {
      type: Array,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    commentStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = model<PostDocument>("Post", postSchema);
export default Post;