const catchAsync = require("../../utils/catchAsync");
const BettingHistories = require("../models/2DBettingHistoriesModel");
const all2D = require("../../utils/all2DNums");

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
        const table2 = [];
        const table3 = [];

        const table1 = await Promise.all(
          all2D.map(async (single) => {
            const hisByNum = await BettingHistories.find({
              number: single.number,
            });

            const totalAmountForEachNum =
              hisByNum.length > 0
                ? hisByNum.reduce((acc, cur) => {
                    return Number(acc.amount) + Number(cur.amount);
                  }, 0)
                : 0;
            const obj = {
              number: single.number,
              noOfBet: hisByNum.length,
              total: totalAmountForEachNum,
              amountOfSuccess,
            };
            return obj;
          })
        );
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
