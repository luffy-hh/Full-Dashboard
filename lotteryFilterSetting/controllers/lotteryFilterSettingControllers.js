const mongoose = require("mongoose");
const LotteryFilterSetting = require("../models/lotteryFilterSettingModels");
const moment = require("moment-timezone");
const Thai2DNum12AM = require("../../lottery_nuumbers/models/thai2DNum12Models");
const Thai2DNumEvening = require("../../lottery_nuumbers/models/thai2DNumEveningModel");
const MasterSubCatStatus = require("../../category_status/models/master_subCat_status_models");
const GameSubCat = require("../../gameCategories/models/gameSubCatModels");
const Thai3DNum = require("../../lottery_nuumbers/models/thai3DNumModels");
const Thai2DSale = require("../../2dSales/models/2dsalemodels");
// Create Lottery Setting
exports.createLotterySetting = async (req, res) => {
  try {
    const reqBody = req.body;
    const currentTime = new Date();
    reqBody.startDate = currentTime;
    reqBody.endDate = currentTime;
    const subCat = await GameSubCat.findById(req.body.subCategoryId);
    const newLotterySetting = await LotteryFilterSetting.create({
      ...reqBody,
      subCategoryName: subCat.subCatName,
    });

    let newSubCatStatus = {
      ...subCat,
      mainCompensation: newLotterySetting.mainCompensation,
    };
    async function updateDocuments() {
      try {
        await MasterSubCatStatus.updateMany(
          {},
          { $push: { subCatStatus: newSubCatStatus } }
        );
        console.log("New Sub cat status added successfully.");
      } catch (error) {
        console.log(
          "There is an error in adding new sub cat status.",
          error?.stack
        );
      }
    }
    updateDocuments();

    console.log(newLotterySetting);

    const resObj = await LotteryFilterSetting.findById(
      newLotterySetting._id
    ).populate("subCategoryId");

    resObj.startDate = moment(resObj.startDate).tz("Asia/Yangon").format();
    resObj.endDate = moment(resObj.endDate).tz("Asia/Yangon").format();

    res.status(201).json({
      status: "success",
      data: {
        resObj,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
    console.log(err);
  }
};

// Read All Lottries Setting
exports.getAllLotterySetting = async (req, res) => {
  const query = LotteryFilterSetting.find().populate("subCategoryId");
  const showLotterySettingAll = await query;

  res.status(200).json({
    status: "Success",
    data: {
      showLotterySettingAll,
    },
  });
};

// Update Single Lottery Game Setting Start Time , End Time and limitAmount
exports.updateLotterySettingById = async (req, res) => {
  try {
    const id = req.body.id;

    const updateLotterySetting = await LotteryFilterSetting.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    const dailyPlayedObjDeletedSubCatArr = await Thai2DSale.deleteMany({
      subCatId: id,
    });
    if (updateLotterySetting.subCategoryName === "Thai 12:00 PM") {
      await Thai2DNum12AM.updateMany({
        $set: {
          limitAmount: updateLotterySetting.limitAmount,
          lastAmount: updateLotterySetting.limitAmount,
        },
      });
    } else if (updateLotterySetting.subCategoryName === "Thai 4:30 PM") {
      await Thai2DNumEvening.updateMany({
        $set: {
          limitAmount: updateLotterySetting.limitAmount,
          lastAmount: updateLotterySetting.limitAmount,
        },
      });
    } else if (updateLotterySetting.subCategoryName === "Thai 3d Lottery") {
      await Thai3DNum.updateMany({
        $set: {
          limitAmount: updateLotterySetting.limitAmount,
          lastAmount: updateLotterySetting.limitAmount,
        },
      });
    }
    res.status(200).json({
      status: "Success",
      data: {
        updateLotterySetting,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
