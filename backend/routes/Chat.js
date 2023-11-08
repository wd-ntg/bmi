const express = require("express");
const passport = require("passport");

const ChatModel = require("../models/Chat");

const router = express.Router();

router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { message, currentUserId } = req.body;

      const chat = await ChatModel.findOne({
        owner: currentUserId,
      });

      if (chat) {
        const updatedChat = await ChatModel.findOneAndUpdate({
          owner: currentUserId,
          $push: { chat: message },
        });
        return res.status(200).json(updatedChat.chat);
      } else {
        const createChat = await ChatModel.create({
          owner: currentUserId,
          chat: message,
        });
        return res.status(200).json(createChat.chat);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error send message", error });
    }
  }
);
router.post(
  "/getChats",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { currentUserId } = req.body

      const chat = await ChatModel.findOne({
        owner: currentUserId,
      });

      
      if (!chat) {
        return res.status(200).json({message: "Don't exits chat"});
      }

      return res.status(200).json(chat.chat);
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error send message", error });
    }
  }
);

router.post(
  "/clear",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { currentUserId } = req.body

      const chat = await ChatModel.findOne({
        owner: currentUserId,
      });

      
      if (!chat) {
        return res.status(200).json({message: "Don't exits chat"});
      } else {
        const clearChat = await ChatModel.deleteOne({
          owner: currentUserId
        })
      }

      return res.status(200).json({message: "Clear chat is success!"});
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error send message", error });
    }
  }
);


module.exports = router;
