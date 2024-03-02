const GameSoftTransaction = require("./gamesoftTransactionModel");
const catchAsync = require("../../utils/catchAsync");

exports.createTransaction = catchAsync(async (req, res) => {
  try {
    const { providerCode, providerName, gameTypeCode, gameType } = req.body;
    const reqBody = {
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
    };

    const newTransaction = await createTransaction.create(reqBody);

    res.status(201).json({
      status: "success",
      data: {
        newTransaction,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.readProvuders = catchAsync(async (req, res) => {
  try {
    const providersObj = await Provider.find({});

    res.status(201).json({
      status: "success",
      count: providersObj.length,
      data: {
        providersObj,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
