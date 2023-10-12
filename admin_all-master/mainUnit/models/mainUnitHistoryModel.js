const mongoose = require("mongoose");
const mainUnitHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "UserId must be add"],
  },
  userName: {
    type: String,
    required: [true, "UserName must be add"],
  },
  createDate: {
    type: Date,
    required: [true, "Product name must be add"],
  },
  actionAmount: {
    type: Number,
    required: [true, "Product name must be add"],
  },
  newAmount: {
    type: Number,
    required: [true, "Product name must be add"],
  },
  status: {
    type: String,
  },
});
const MainUnitHistory = mongoose.model(
  "MainUnitHistory",
  mainUnitHistorySchema
);
module.exports = MainUnitHistory;
