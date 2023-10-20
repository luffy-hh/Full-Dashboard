const LotterySetting = require("../../lotterySetting/models/lotterySettingModels");
const TwoDLucky = require("../models/2DLuckyNumber");

exports.create2DLucky = async (req, res, next) => {
  try {
    // console.log(new2DLucky);
    const lotterySetting = await LotterySetting.findOne({
      subCategoryId: req.body.subCatId,
    });
    const startDate = lotterySetting.startDate;
    const new2DLucky = await TwoDLucky.create({ ...req.body });
  } catch (error) {
    throw new Error(error);
  }
};
