const LuckyWinner = require("../models/LuckyWinnerModel");

exports.createLuckyWinner = async (obj) => {
  return await LuckyWinner.create({ ...obj });
};

exports.getAllLuckyWinner = async (req, res, next) => {
  try {
    const allWinner = await LuckyWinner.find({}).populate("userId");
    if (allWinner.length > 0) {
      res.status(200).json({
        status: "succeed",
        data: allWinner,
      });
    } else {
      res.status(200).json({
        status: "succeed",
        message: "There is no winner yet.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
