const mongoose = require("mongoose");

const shanPlayRingSchema = new mongoose.Schema({
  ring_name: {
    type: "String",
    require: true,
  },
  shan_roll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShanRoll",
    required: true,
  },
  banker_amount: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "in-active"],
    default: "active",
  },
  game_round: {
    type: Number,
    default: 0,
  },
  players: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      player_roll: {
        type: String,
        enum: ["banner", "player"],
        default: "banner",
      },
      game_unit: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const ShanPlayRing = mongoose.model("ShanPlayRing", shanPlayRingSchema);

module.exports = ShanPlayRing;
