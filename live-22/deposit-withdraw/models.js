const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
