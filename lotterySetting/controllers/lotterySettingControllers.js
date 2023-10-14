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
    console.log(reqBody, subCatId, subCatName, "This is Line 11");
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
      updateData, // Corrected variable name
      {
        new: true,
        runValidators: true,
      }
    );

    await Thai2DMorning12.updateMany(
      { limitAmount: originalLimitAmount },
      { limitAmount: updateData.limitAmount } // Corrected variable name
    );

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

// const batchArr = await batch.find();
// const batchNum = batchArr.length;
// const currentDate = new Date();
// const gameSubId = "65191e5394d5823f2a6e2031";
// const gameSubObj = await gamesubcats.findById(gameSubId);
// const gameSubName = gameSubObj.subcat_name;

// const newBatchObj = {
//   batchNumber: batchNum,
//   gameName: gameSubName,
//   subCategoryId: gameSubId,
//   date: currentDate,
// };

// const newBatch = await batch.create(newBatchObj);
// const updateStatus = await lotterySetting.findByIdAndUpdate(
//   "65242bfd81844c97fb089e66",
//   { status: true }
// );
// console.log();
