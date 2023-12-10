const MainUnit = require("../../mainUnit/models/mainUnitModel");
const Thai3DLucky = require("../models/Thai3DLuckyModel");
const Thai3DSale = require("../../3DSales&History/models/3dSaleModel");
const User = require("../../users/userModels");
const MasterSubCatStatus = require("../../category_status/models/master_subCat_status_models");
const Thai3DLuckyWinner = require("../models/Thai3DLuckyWinnerModel");
const Thai3DNum = require("../../lottery_nuumbers/models/thai3DNumModels");
exports.create3DLucky = async (req, res) => {
  try {
    const mainUnitArr = await MainUnit.find({});
    const mainUnitId = mainUnitArr[0]._id;
    const currentDay = new Date();
    const new3DLucky = await Thai3DLucky.create({
      ...req.body,
      date: currentDay,
    });
    const docs = await Thai3DNum.find({});
    for (let doc of docs) {
      doc.lastAmount = doc.limitAmount;
      doc.totalAmount = 0;
      doc.percentage = 0;
      await doc.save();
    }
    const weeklyPlayedObj = await Thai3DSale.find({});
    let winnerListArr = [];
    if (weeklyPlayedObj.length > 0) {
      for (const play of weeklyPlayedObj) {
        if (play?.number === new3DLucky?.number) {
          const user = await User.findById(play.userId);

          const upLineAgent = await User.findOne({ userId: user?.uplineId });

          const upLineMaster = await User.findOne({
            userId: upLineAgent.uplineId,
          });

          const masterSubCats = await MasterSubCatStatus.findOne({
            master_id: upLineMaster._id,
          });
          console.log(masterSubCats.subCatStatus);
          const masterCommissionOfCurSubCat = masterSubCats.subCatStatus.find(
            (subCat) => subCat._id.toString() === play.subCatId.toString()
          );
          console.log(masterCommissionOfCurSubCat);
          const returnedAmount =
            play?.amount * masterCommissionOfCurSubCat?.mainCompensation;

          const obj = {
            userId: play.userId,
            playedAmount: play?.amount,
            number: play.number,
            returnedAmount,
            date: currentDay,
          };

          const winnerObj = await Thai3DLuckyWinner.create(obj);
          const updatedUser = await User.findByIdAndUpdate(winnerObj.userId, {
            $inc: { unit: winnerObj.returnedAmount },
          });
          const updatedMainUnit = await MainUnit.findByIdAndUpdate(mainUnitId, {
            $inc: { mainUnit: -winnerObj.returnedAmount },
          });
          winnerListArr.push(winnerObj);
        }
      }
      res.status(200).json({
        status: "succeed",
        data: winnerListArr,
      });
    } else {
      res.status(200).json({
        status: "succeed",
        message: "There is no play for this Week.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
};

exports.getAll3DLuckies = async (req, res, next) => {
  try {
    const allLuckiesNums = await Thai3DLucky.find({}).populate("subCatId");
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
