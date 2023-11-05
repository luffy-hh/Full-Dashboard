const TwoDLucky = require("../models/TwoDLuckiesModel");
const moment = require("moment-timezone");
const User = require("../../users/userModels");
const MasterSubCatStatus = require("../../category_status/models/master_subCat_status_models");
const Thai2DSale = require("../../2dSales/models/2dsalemodels");
const { createLuckyWinner } = require("./LuckyWinnerController");

exports.createTwoDLucky = async (req, res, next) => {
  try {
    const currentDay = new Date().getDate();
    const newTwoDLucky = await TwoDLucky.create({
      ...req.body,
      date: currentDay,
    });
    console.log(newTwoDLucky);
    const dailyPlayedObjOfEachSubCatArr = await Thai2DSale.deleteMany({
      subCatId: newTwoDLucky?.subCatId,
    });
    let winnerListArr = [];
    for (let play in dailyPlayedObjOfEachSubCatArr) {
      if (play?.number === newTwoDLucky?.number) {
        console.log(play);
        const user = await User.findById(play.userId);
        const upLineAgent = await User.findOne({ userId: user?.uplineId });
        const upLineMaster = await User.findOne({
          userId: upLineAgent.uplineId,
        });
        const masterSubCats = await MasterSubCatStatus.findOne({
          master_id: upLineMaster._id,
        });
        const masterCommissionOfCurSubCat = masterSubCats.subCatStatus.find(
          (subCat) => subCat._id === play.subCatId
        );
        console.log(masterCommissionOfCurSubCat);
        const returnedAmount =
          play?.amount * masterCommissionOfCurSubCat?.mainCompensation;

        const obj = {
          userId: play.userId,
          playedAmount: play?.amount,
          returnedAmount,
          date: currentDay,
        };
        const winnerObj = createLuckyWinner(obj);
        winnerListArr.push(winnerObj);
      }
    }
    res.status(200).json({
      status: "succeed",
      data: winnerListArr,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
};

exports.getAllSetLuckies = async (req, res, next) => {
  try {
    const allLuckiesNums = await TwoDLucky.find({});
    res.status(200).json({
      status: "succeed",
      data: allLuckiesNums,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
