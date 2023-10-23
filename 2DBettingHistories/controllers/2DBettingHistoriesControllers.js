const catchAsync = require("../../utils/catchAsync");
const BettingHistories = require("../models/2DBettingHistoriesModel");
exports.createHistories = async (obj) => {
  const newBettingHistory = await BettingHistories.create({
    ...obj,
  });
  return newBettingHistory;
};

exports.getAllBettingHistories = catchAsync(async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      const allHistories = await BettingHistories.find({});
      if (allHistories.length > 0) {
        res.status(200).json({
          status: "Success",
          allReports: allHistories,
        });
      } else {
        res.status(200).json({
          status: "Success",
          massage: "There is no report yet.",
        });
      }
    } else {
      const userHistories = await BettingHistories.find({
        userId: req.user._id,
      });
      if (userHistories.length > 0) {
        res.status(200).json({
          status: "Success",
          reports: userHistories,
        });
      } else {
        res.status(200).json({
          status: "Success",
          message: "You haven't played this yet",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error?.message,
    });
  }
});
