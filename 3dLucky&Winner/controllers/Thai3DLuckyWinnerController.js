const Thai3DLuckyWinner = require("../models/Thai3DLuckyWinnerModel");

exports.getAll3DLuckyWinner = async (req, res, next) => {
  try {
    const allWinner = await Thai3DLuckyWinner.find({}).populate("userId");
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
