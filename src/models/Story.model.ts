import mongoose, { Schema } from "mongoose";

interface StoryDoc extends Document {
  user: string;
  storyText: string;
  storyImage: string[];
}

const storySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storyText: {
      type: String,
      required: true,
      trim: true,
    },
    storyImage: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model<StoryDoc>("Story", storySchema);
export default Story;
