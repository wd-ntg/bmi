const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    chat: [
      {
        type: String,
        required: false,
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("Chat", ChatSchema)

module.exports = ChatModel