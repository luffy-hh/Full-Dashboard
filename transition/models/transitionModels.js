const mongoose = require("mongoose");

const transtionSchema = new mongoose.Schema({
  fromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Please Enter Your Transfer Amount"],
  },
  action_time: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
});

const Transition = mongoose.model("Transition", transtionSchema);

module.exports = Transition;
