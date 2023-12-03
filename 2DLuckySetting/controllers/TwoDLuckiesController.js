const TwoDLucky = require("../models/TwoDLuckiesModel");
const moment = require("moment-timezone");
const User = require("../../users/userModels");
const MasterSubCatStatus = require("../../category_status/models/master_subCat_status_models");
const Thai2DSale = require("../../2dSales/models/2dsalemodels");
const Thai2DNum12Am = require("../../lottery_nuumbers/models/thai2DNum12Models");
const MainUnit = require("../../mainUnit/models/mainUnitModel");
const { createLuckyWinner } = require("./LuckyWinnerController");
const GameSubCat = require("../../gameCategories/models/gameSubCatModels")
const Thai2DNumEvening = require('../../lottery_nuumbers/models/thai2DNumEveningModel')

exports.createTwoDLucky = async (req, res, next) => {
  try {
    const mainUnitArr = await MainUnit.find({});
    const mainUnitId = mainUnitArr[0]._id;
    const currentDay = new Date.now();
    const newTwoDLucky = await TwoDLucky.create({
      ...req.body,
      date: currentDay,
    });
    console.log(newTwoDLucky);
    const currentSubCategory = await GameSubCat.findById(newTwoDLucky.subCatId)
    let docs =[]
    if (currentSubCategory.subCatName === "Thai 12:00 PM") {
       docs = await Thai2DNum12Am.find({});
      for (let doc of docs) {
        doc.lastAmount = doc.limitAmount;
        doc.totalAmount = 0;
        doc.percentage = 0;
        await doc.save();
      }
    }else if(currentSubCategory.subCatName === "Thai 4:30 PM"){
       docs = await Thai2DNumEvening.find({});
      for (let doc of docs) {
        doc.lastAmount = doc.limitAmount;
        doc.totalAmount = 0;
        doc.percentage = 0;
        await doc.save();
      }
    }
    const dailyPlayedObjOfEachSubCatArr = await Thai2DSale.find({
      subCatId: newTwoDLucky?.subCatId,
    });

    console.log(dailyPlayedObjOfEachSubCatArr);
    let winnerListArr = [];
    if (dailyPlayedObjOfEachSubCatArr.length > 0) {
      for (const play of dailyPlayedObjOfEachSubCatArr) {
        if (play?.number === newTwoDLucky?.number) {
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

          const winnerObj = await createLuckyWinner(obj);
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
        message: "There is no play for today.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
};

exports.getAllSetLuckies = async (req, res, next) => {
  try {
    const allLuckiesNums = await TwoDLucky.find({}).populate("subCatId");
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
