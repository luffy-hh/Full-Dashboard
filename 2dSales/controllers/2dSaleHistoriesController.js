const User = require("../../users/userModels");
const TwoDSaleHistories = require("../models/2dSaleHistoriesModel");

exports.getHistory = async (req, res, next) => {
  try {
    const loginUserRole = req.user.role;
    if (loginUserRole === "Admin") {
      const allHistories = await TwoDSaleHistories.find({});
      if (allHistories.length > 0) {
        res.status(200).json({
          status: "succeed",
          data: allHistories,
        });
      } else {
        res.status(200).json({
          status: "succeed",
          massage: "There is no report for today",
        });
      }
    } else if (loginUserRole === "Master") {
      const agentListOfThisMaster = await User.find({
        uplineId: req.user.userId,
      });

      const userListOfThisMaster = await Promise.all(
        agentListOfThisMaster.map(async (ag) => {
          const usersOfEachAgentArr = await User.find({ uplineId: ag.userId });
          return usersOfEachAgentArr.length > 0 && usersOfEachAgentArr;
        })
      );
      console.log(userListOfThisMaster);
      const allHistoriesOfAgentArr = await TwoDSaleHistories.find();
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: "Something went wrong with your request.",
    });
  }
};
