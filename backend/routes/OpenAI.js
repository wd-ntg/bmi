const express = require("express");
const passport = require("passport");

const HealthIndexModel = require("../models/HealthIndex");
const UserModel = require("../models/Users");
const FoodRecModel = require("../models/FoodRec");

const router = express.Router();

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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",
  organization: "org-mtgRW3my2tOru3fol4Ts3diA",
});

router.post(
  "/response",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { message } = req.body;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${message}` }],
        model: "gpt-3.5-turbo",
      });
      return res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error / OpenAI is error" });
    }
  }
);

router.post(
  "/evaluate",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { height, weight, BMI } = req.body;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Với chiều cao ${height} cm, cân nặng ${weight} kg và chỉ số BMI là ${BMI} hãy cho tôi một bài báo cáo dinh dưỡng đơn giản cho cơ thể này và cho biết một ngày cần nạp tối thiểu những chất dinh dưỡng nào đưa ra con số cụ thể. (Trình bày dưới dạng liệt kê theo danh sách)`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      return res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error / OpenAI is error" });
    }
  }
);

router.post(
  "/advice",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { height, weight, BMI } = req.body;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Với chiều cao ${height} cm, cân nặng ${weight} kg và chỉ số BMI là ${BMI} hãy cho tôi một lời khuyên để cải thiện tình trạng sức khỏe cũng như các chỉ số cơ thể. (Trình bày dưới dạng liệt kê theo danh sách)`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      return res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error / OpenAI is error" });
    }
  }
);

module.exports = router;
