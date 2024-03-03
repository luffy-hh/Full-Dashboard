const GameType = require("./gameTypeModel");
const catchAsync = require("../../utils/catchAsync");

exports.createGameType = catchAsync(async (req, res) => {
  try {
    const { gameTypeCode, gameType } = req.body;
    const reqBody = {
      gameTypeCode,
      gameType,
    };

    const newGameType = await GameType.create(reqBody);

    res.status(201).json({
      status: "success",
      data: {
        newGameType,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

exports.readGameTypes = catchAsync(async (req, res) => {
  try {
    const gameTypeObj = await GameType.find({});

    res.status(201).json({
      status: "success",
      count: gameTypeObj.length,
      data: {
        gameTypeObj,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
