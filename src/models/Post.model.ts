import mongoose, { Schema } from "mongoose";

interface PostDoc extends Document {
  user: string;
  postCaption: string;
  postImage: string[];
  likes: [];
  comments: [];
}

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postCaption: {
      type: String,
      trim: true,
    },
    postImage: [
      {
        type: String,
        required: false,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<PostDoc>("Post", postSchema);
export default Post;
