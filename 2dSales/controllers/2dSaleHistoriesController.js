const User = require("../../users/userModels");
const TwoDSaleHistories = require("../models/2dSaleHistoriesModel");
const Thai2DSale = require("../models/2dsalemodels");

exports.getHistory = async (req, res, next) => {
  try {
    const loginUserRole = req.user.role;
    if (loginUserRole === "Admin") {
      const allHistories = await TwoDSaleHistories.find({})
        .populate("subCatId")
        .populate("userId");

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
      let downUserPlayedOfThisMaster = [];
      for (let agent of agentListOfThisMaster) {
        const usersOfEachAgentArr = await User.find({ uplineId: agent.userId });
        for (let user of usersOfEachAgentArr) {
          const playedHistory = await TwoDSaleHistories.find({
            userId: user._id,
          });
          downUserPlayedOfThisMaster.push([...playedHistory]);
        }
      }
      console.log(downUserPlayedOfThisMaster);
      if (downUserPlayedOfThisMaster.length > 0) {
        res.status(200).json({
          status: "succeed",
          data: downUserPlayedOfThisMaster,
        });
      } else {
        res.status(200).json({
          status: "succeed",
          message: "There is no report yet.",
        });
      }

      // const downUserPlayedOfThisMaster = await Promise.all(
      //   agentListOfThisMaster.map(async (ag) => {
      //     const usersOfEachAgentArr = await User.find({ uplineId: ag.userId });
      //     const playedHistory = ;
      //   })
      // );

      // await TwoDSaleHistories.find();
    } else if (loginUserRole === "User") {
      const historiesOfThisUser = await Thai2DSale.find({
        userId: req.user.id,
      }).populate("subCatId");
      if (historiesOfThisUser.length > 0) {
        res.status(200).json({
          status: "succeed",
          data: historiesOfThisUser,
        });
      } else {
        res.status(200).json({
          status: "succeed",
          message: "There is no record for today.",
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: "Something went wrong with your request.",
    });
  }
};
