const mongoose = require("mongoose");
const GameTypeSchema = mongoose.Schema({
  gameTypeCode: {
    type: Number,
    required: [true, "Please insert Game Type Code"],
  },
  gameType: {
    type: String,
    required: [true, "Please insert Game Type Name"],
  },
});

const GameSoftGameType = mongoose.model("GameSoftGameType", GameTypeSchema);
module.exports = GameSoftGameType;
