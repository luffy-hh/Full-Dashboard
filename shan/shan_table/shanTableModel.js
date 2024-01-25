const mongoose = require("mongoose");

const shanTableSchema = new mongoose.Schema({
  tableName: {
    type: "String",
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShanRoll",
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["inactive", "active"],
    default: "inactive",
  },
  endPoint: {
    type: String,
  },
  players: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      player_role: {
        type: String,
        enum: ["banker", "player"],
        default: "banker",
      },
      bank_amt: {
        type: Number,
        default: 0,
      },
      play_amt: {
        type: Number,
        default: 0,
      },
      player_status: {
        type: String,
        enum: ["play", "wait"],
        default: "wait",
      },
      player_card: [],
    },
  ],
});

const ShanTable = mongoose.model("ShanTable", shanTableSchema);

module.exports = ShanTable;
