const mongoose = require("mongoose");

const shanPlayRingSchema = new mongoose.Schema({
  ring_name: {
    type: "String",
    required: true,
  },
  shan_roll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShanRoll",
    required: true,
  },
  banker_amount: {
    type: Number,
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
        enum: ["banker", "player"],
        default: "banker",
      },
      playingStatus:{
        type:String,
        enum:["playing","waiting"],
        default:"waiting"
      },
      game_unit: {
        type: Number,
        default: 0,
      },
      finalResult:{
        type:String,
        enum:["win","lose"]
      }
    },
  ],
});

const ShanPlayRing = mongoose.model("ShanPlayRing", shanPlayRingSchema);

module.exports = ShanPlayRing;
