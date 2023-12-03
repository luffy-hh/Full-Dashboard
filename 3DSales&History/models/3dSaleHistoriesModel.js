const mongoose = require("mongoose");

const lottery3DSaleHistoriesSchema = new mongoose.Schema({
  subCatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameSubCat", // Reference to the gamesubcats collection
    required: [true, "Please insert subCatId"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the users collection
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

const Thai3DSaleHistory = mongoose.model(
  "Thai3DSaleHistory",
  lottery3DSaleHistoriesSchema
);

module.exports = Thai3DSaleHistory;
