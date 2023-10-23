const LotterySetting = require("../../lotterySetting/models/lotterySettingModels");
const Thai2DSale = require("../../sales/models/2dsalemodels");
const TwoDLucky = require("../models/2DLuckyNumber");
const User = require("../../users/userModels");
const MainUnit = require("../../mainUnit/models/mainUnitModel");

exports.create2DLucky = async (req, res, next) => {
  try {
    // console.log(new2DLucky);
    const lotterySetting = await LotterySetting.findOne({
      subCategoryId: req.body.subCatId,
    });
    const currentTime = new Date();
    const startDate = lotterySetting.startDate;
    const new2DLucky = await TwoDLucky.create({
      ...req.body,
      date: currentTime,
    });
    const usersPlayedRecord = await Thai2DSale.find({
      subCatId: req.body.subCatId,
    });
    console.log(usersPlayedRecord);
    const updatedUsers = [];
    const winnedPlay = await Promise.all(
      usersPlayedRecord
        .filter((play) => play.number === new2DLucky.luckyNumber)
        .map(async (play) => {
          const user = await User.findById(play.userId);
          // console.log(user);
          const increasedAmount = play.amount * lotterySetting.mainCompensation;
          const updateUser = await User.findByIdAndUpdate(
            play.userId,
            {
              $inc: { unit: increasedAmount },
            },
            { new: true }
          );
          const mainUnitArr = await MainUnit.find({});
          const updatedUnit = await MainUnit.findByIdAndUpdate(
            mainUnitArr[0]._id,
            {
              $inc: { mainUnit: -increasedAmount },
            },
            { new: true }
          );
          console.log(updatedUnit);
          updatedUsers.push(updateUser);
          return updateUser;
        })
    );
    console.log(winnedPlay);
    res.status(200).json({
      status: "succeed",
      message: "Lucky Numbers created successfully",
    });
    // Wait for all the promises to resolve
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  } finally {
    const deleteAll2DSale = await Thai2DSale.deleteMany({});
    console.log(deleteAll2DSale);
  }
};
