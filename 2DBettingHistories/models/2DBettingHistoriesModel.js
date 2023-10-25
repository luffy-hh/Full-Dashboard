const mongoose = require("mongoose");

const bettingHistoriesSchema = mongoose.Schema({
  subCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gamesubcats", // Reference to the gamesubcats collection
    required: [true, "Please insert subCatId"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the users collection
    required: [true, "Please insert userId"],
  },
  number: {
    type: String, // Keep it as a string to support numeric strings
    required: [true, "2D Number must be added"],
  },
  amount: {
    type: Number,
    default: 0,
  },
  currentTime: {
    type: Date,
    default: Date.now,
  },
});

const BettingHistories = mongoose.model(
  "BettingHistories",
  bettingHistoriesSchema
);
module.exports = BettingHistories;
