const express = require("express");
const passport = require("passport");

const HealthIndexModel = require("../models/HealthIndex");
const UserModel = require("../models/Users");

const router = express.Router();

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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",
  organization: "org-UOQe2ucZnYTY7jIv5YbdmcDD",
});
// const openai = new OpenAI({
//   apiKey: "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",
//   organization: "org-mtgRW3my2tOru3fol4Ts3diA",
// });

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
            content: `Với chiều cao ${height} cm, cân nặng ${weight} kg và chỉ số BMI là ${BMI} hãy cho tôi một bài báo cáo dinh dưỡng đơn giản cho cơ thể này và cho biết một ngày cần nạp tối thiểu những chất dinh dưỡng nào đưa ra con số cụ thể. (Trình bày dưới dạng liệt kê theo danh sách với tối đa 5 dòng)`,
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
            content: `Với chiều cao ${height} cm, cân nặng ${weight} kg và chỉ số BMI là ${BMI} hãy cho tôi một lời khuyên để cải thiện tình trạng sức khỏe cũng như các chỉ số cơ thể. (Trình bày dưới dạng liệt kê theo danh sách với tối đa là 5 dòng)`,
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
