const express = require("express");
const passport = require("passport");

const HealthIndexModel = require("../models/HealthIndex");
const UserModel = require("../models/Users");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { height, weight, currentUser } = req.body;
      if (!height || !weight) {
        return res.status(400).json({ err: "Insufficient data" });
      }

      // Kiểm tra xem đã có dữ liệu sức khỏe cho người dùng này chưa
      const existingHealthIndex = await HealthIndexModel.findOne({
        owner: currentUser._id,
      });

      if (existingHealthIndex) {
        // Nếu đã có dữ liệu, cập nhật thông tin
        existingHealthIndex.weight = weight;
        existingHealthIndex.height = height;
        existingHealthIndex.BMI = (
          weight /
          ((height / 100) * (height / 100))
        ).toFixed(2);

        await existingHealthIndex.save();
        return res.status(200).json("Updated successfully");
      } else {
        // Nếu chưa có dữ liệu, tạo mới
        const healthIndexData = {
          weight,
          height,
          BMI: (weight / ((height / 100) * (height / 100))).toFixed(2),
          owner: currentUser._id,
          food: [],
        };
        const healthIndex = await HealthIndexModel.create(healthIndexData);
        return res.status(200).json("Created successfully");
      }
    } catch (error) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

router.get(
  "/getinfo/:currentUserId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUserId = req.params.currentUserId;
      const user = await UserModel.findOne({ _id: currentUserId });
      if (!user) {
        return res.status(301).json({ err: "Invalid User ID" });
      }
      const healthIndexInfo = await HealthIndexModel.find({
        owner: currentUserId,
      }).populate("owner");
      return res.status(200).json(healthIndexInfo);
    } catch (error) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

router.post(
  "/getinfoUser",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const {email} = req.body;
      const user = await UserModel.findOne({email: email});
      if (!user) {
        return res.status(301).json({ err: "Invalid User Email" });
      }
      const healthIndexInfo = await HealthIndexModel.find({
        owner: user.id,
      }).populate("owner")
      return res.status(200).json(healthIndexInfo);
    } catch (error) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

module.exports = router;
