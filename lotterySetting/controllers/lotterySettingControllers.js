const LotterySetting = require("../models/lotterySettingModels");
const GameSubCategories = require("../../gameCategories/models/gameSubCatModels");
const Thai2DMorning12 = require("../../2DAll/models/thai2DLotteryMorning12Models");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

// Create Lottery Setting
exports.createLotterySetting = async (req, res) => {
  try {
    const reqBody = req.body;
    const subCatId = reqBody.subCategoryId;
    const subCatObj = await GameSubCategories.findById(subCatId);
    const subCatName = subCatObj.subCatName;

    const currentTime = moment().tz("Asia/Yangon").format();

    const newLotteryRule = {
      subCategoryId: subCatId,
      subCategoryName: subCatName,
      settingName: reqBody.settingName,
      startDate: currentTime,
      endDate: currentTime,
    };
    const newLotterySetting = await LotterySetting.create(newLotteryRule);

    res.status(201).json({
      status: "success",
      data: {
        newLotterySetting,
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

// Read Lottery All Game Setting
exports.getAllLotterySetting = async (req, res) => {
  const query = LotterySetting.find();
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
    const id = req.params.id;
    const updateData = req.body;

    const originalLotterySetting = await LotterySetting.findById(id);
    const originalLimitAmount = originalLotterySetting.limitAmount;

    const updateLotterySetting = await LotterySetting.findByIdAndUpdate(
      id,
      { $set: { ...updateData } }, // Corrected variable name
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(
      "Original Limit Amount:",
      originalLimitAmount,
      originalLotterySetting
    );
    // console.log("Update Limit Amount:", updateData?.limitAmount);
    if (updateData.limitAmount !== undefined) {
      const morning = await Thai2DMorning12.find({});
      const updatedMorning = await Thai2DMorning12.updateMany(
        {},
        {
          $set: {
            limitAmount: updateData.limitAmount,
            lastAmount: updateData.limitAmount,
          },
        },
        { new: true }
      );
      console.log(updatedMorning, morning, 86);
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
