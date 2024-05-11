import mongoose, { Schema } from "mongoose";

interface ConversationDoc extends Document {
  participants: [];
}

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model<ConversationDoc>(
  "Conversation",
  conversationSchema
);
export default Conversation;
