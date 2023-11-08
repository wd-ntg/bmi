const express = require("express");
const passport = require("passport");

const CalendarModel = require("../models/Calendar");

const router = express.Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { event, currentUserId } = req.body;

      const Calendar = await CalendarModel.findOne({
        owner: currentUserId,
      });

      if (Calendar) {
        const updatedCalendar = await CalendarModel.findOneAndUpdate({
          $push: { calendar: event },
        });

        return res.status(200).json({ message: "Update success" });
      } else {
        const newCalendar = await CalendarModel.create({
          calendar: event,
          owner: currentUserId,
        });
        return res
          .status(200)
          .json({ message: "Create Calendar for user is success!" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error create calendar" });
    }
  }
);

router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { eventId, currentUserId } = req.body;

      if (eventId && currentUserId) {
        const findCalendar = await CalendarModel.updateOne(
          { owner: currentUserId },
          { $pull: { calendar: { id: eventId } } }
        );
      }

      return res
        .status(200)
        .json({ message: "Delete event calendar is success!" });
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error delete calendar", error });
    }
  }
);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { eventToUpdate, currentUserId } = req.body;

      // Tìm lịch của người dùng dựa trên currentUserId
      const calendar = await CalendarModel.findOne({ owner: currentUserId });

      if (!calendar) {
        return res.status(404).json({ message: "Calendar not found" });
      }

      const findEventToUpdate = calendar.calendar.find(
        (event) => event.id === eventToUpdate.id
      );

      if (!findEventToUpdate) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Tiến hành cập nhật thông tin của sự kiện ở đây
      findEventToUpdate.title = eventToUpdate.title;
      findEventToUpdate.des = eventToUpdate.des;

      // Lưu thay đổi vào cơ sở dữ liệu
      await calendar.save();

      return res
        .status(200)
        .json({ message: "Update event calendar is success!" });
    } catch (error) {
      return res
        .status(500)
        .json({ err: "Internal server error update calendar", error });
    }
  }
);


router.post(
  "/getCalendar",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { currentUser } = req.body;

      const findCalendar = await CalendarModel.findOne({
        owner: currentUser._id,
      });

      if (findCalendar) {
        return res.status(200).json(findCalendar.calendar);
      } else {
        return res.status(403).json({ error: "Data is not exits" });
      }
    } catch (error) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
);

module.exports = router;
