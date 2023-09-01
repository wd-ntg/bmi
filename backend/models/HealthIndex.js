const mongoose = require("mongoose");

const HealthIndexSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  BMI: {
    type: Number,
    required: false,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  food: [
    {
      type: mongoose.Types.ObjectId,
      ref: "FoodRec",
    },
  ],
});

const HealthIndexModel = mongoose.model("HealthIndex", HealthIndexSchema);

module.exports = HealthIndexModel;
