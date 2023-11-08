// const mongoose = require("mongoose");

// const CalendarSchema = new mongoose.Schema(
//   {
//     owner: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//     },
//     calendar: {
//       type: String,
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// const CalendarModel = mongoose.model("Calendar", CalendarSchema);

// module.exports = CalendarModel;

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  allDay: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const CalendarSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    calendar: [EventSchema],
  },
  { timestamps: true }
);

const CalendarModel = mongoose.model("Calendar", CalendarSchema);

module.exports = CalendarModel;
