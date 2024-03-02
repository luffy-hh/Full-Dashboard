const mongoose = require("mongoose");
const GameSoftTransactionSchema = mongoose.Schema({
  wagerID: {
    type: string,
    required: [true, "Please insert Wager Id"],
  },
  gameID: {
    type: String,
    required: [true, "Please insert Game Id"],
  },
  gameRoundID: {
    type: String,
    required: [true, "Please insert Game Round Id"],
  },
  validBetAmount: {
    type: Number,
    required: [true, "Please insert Valid Bet Amount"],
  },
  betAmount: {
    type: Number,
    required: [true, "Please insert Bet Amount"],
  },
  payoutAmount: {
    type: Number,
    required: [true, "Please insert Payout Amount"],
  },
  payoutDetail: {
    type: String,
    required: [true, "Please insert Payout Detail"],
  },
  betDetail: {
    type: String,
    required: [true, "Please insert Bet Detail"],
  },
  commisionAmount: {
    type: Number,
    required: [true, "Please insert Comession Amount"],
  },
  jackpotAmount: {
    type: Number,
    required: [true, "Please insert Jack Pot Amount"],
  },
  settlementDate: {
    type: String,
    required: [true, "Please insert Settlement Date"],
  },
  jPBet: {
    type: String,
    required: [true, "Please insert JP Bet"],
  },
});

const GameSoftTransaction = mongoose.model(
  "GameSoftTransaction",
  GameSoftTransactionSchema
);
module.exports = GameSoftTransaction;
