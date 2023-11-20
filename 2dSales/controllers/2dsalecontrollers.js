const Thai2DSale = require("../models/2dsalemodels");
const Thai2DNum12AM = require("../../lottery_nuumbers/models/thai2DNum12Models");
const lotterySetting = require("../../lotteryFilterSetting/models/lotteryFilterSettingModels");
const User = require("../../users/userModels");
const GameSubCat = require("../../gameCategories/models/gameSubCatModels");
const SaleHistories = require("../models/2dSaleHistoriesModel");
const MainUnit = require("../../mainUnit/models/mainUnitModel");
const moment = require("moment-timezone");
const mongoose = require("mongoose");
const Thai2DNumEvening = require("../../lottery_nuumbers/models/thai2DNumEveningModel");

exports.create2DsaleDoc = async (req, res) => {
  try {
    const mainUnitArr = await MainUnit.find({});
    const mainUnitId = mainUnitArr[0]._id;
    const currentSubCat = await GameSubCat.findById(req.body.subCatId);
    console.log(currentSubCat);
    let All2DDependingOnSubCat = [];
    if (currentSubCat.subCatName === "Thai 12:00 PM") {
      All2DDependingOnSubCat = await Thai2DNum12AM.find({});
    } else if (currentSubCat.subCatName === "Thai 4:30 PM") {
      All2DDependingOnSubCat = await Thai2DNumEvening.find({});
    }
    const selectedSetting = await lotterySetting.findOne({
      subCategoryId: currentSubCat._id,
    });
    console.log(selectedSetting);
    const mainUnitObj = await MainUnit.findById(mainUnitId);
    const currentTime = new Date();
    console.log(selectedSetting.startDate, selectedSetting.endDate);
    const startDate = new Date(selectedSetting.startDate);
    // (new Date(selectedSetting.startDate))
    //   .tz("Asia/Yangon")
    //   .format();
    const endDate = new Date(selectedSetting.endDate);
    console.log(startDate.getTime(), currentTime.getTime(), endDate.getTime());
    console.log(
      startDate.getTime() <= currentTime.getTime(),
      currentTime.getTime() < endDate.getTime()
    );

    const user = await User.findById(req.user.id);
    console.log(user);
    if (
      startDate.getTime() <= currentTime.getTime() &&
      currentTime.getTime() < endDate.getTime()
    ) {
      const reqBody = req.body;
      // make an array for playableNumber
      const playedNumbers = reqBody.saleNumberArr.filter((sale) => {
        let curNum = All2DDependingOnSubCat.find(
          (num) => num.number === sale.number
        );
        return sale.amount <= curNum.lastAmount && sale;
      });

      // make an array for unplayableNumber
      const unPlayAbleNumbers = reqBody.saleNumberArr.filter((sale) => {
        let curNum = All2DDependingOnSubCat.find(
          (num) => num.number === sale.number
        );
        return sale.amount > curNum.lastAmount && sale;
      });
      // console.log(playedNumbers, unPlayAbleNumbers);

      const totalSaleAmount = playedNumbers
        .map((num) => num.amount)
        .reduce((acr, cur) => Number(acr) + Number(cur), 0);
      console.log(
        user,
        user.unit,
        totalSaleAmount,
        mainUnitObj.mainUnit,
        "line 94"
      );
      if (totalSaleAmount <= user.unit) {
        const updatedMainUnit = await MainUnit.findByIdAndUpdate(mainUnitId, {
          mainUnit: mainUnitObj.mainUnit + totalSaleAmount,
        });
        const updatedUser = await User.findByIdAndUpdate(user.id, {
          $inc: { unit: -totalSaleAmount },
        });
        console.log(updatedUser);
        // Loop through the saleNumberArr and create Thai2DSale documents
        for (const sale of playedNumbers) {
          let number = sale.number;
          const updatedDocument = await Thai2DNum12AM.findOne({ number });
          const obj = {
            subCatId: reqBody.subCatId,
            userId: user.id,
            number: number,
            amount: sale.amount,
          };
          const newThai2DSale = new Thai2DSale({ ...obj });
          await SaleHistories.create({ ...obj });
          // Save the new Thai2DSale document to the database
          await newThai2DSale.save();

          // Calculate the total amount for this number
          const totalAmount = await Thai2DSale.aggregate([
            {
              $match: { number: number },
            },
            {
              $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
              },
            },
          ]);

          // update each number with total amount
          const updatedMorning2D = await Thai2DNum12AM.findOneAndUpdate(
            { number },
            {
              $set: {
                totalAmount: totalAmount[0].totalAmount,
                lastAmount:
                  updatedDocument.limitAmount - totalAmount[0].totalAmount,
                percentage:
                  (totalAmount[0].totalAmount / updatedDocument.limitAmount) *
                  100,
              },
            },
            { new: true } // To return the updated document
          );
        }
        if (unPlayAbleNumbers.length > 0) {
          const rejectNums = unPlayAbleNumbers.map((num) => num.number);
          res.status(201).json({
            status: "success",
            unPlayAbleNumbers,
            playedNumbers,
            message:
              "PlayedNumbers are the numbers that are played and unPlayAbleNumbers are rejected numbers by admin.",
          });
        } else {
          res.status(201).json({
            status: "success",
            playedNumbers,
            message: "playedNumbers are the numbers that are played.",
          });
        }
      } else {
        res.status(201).json({
          status: "failed",
          message: "Insufficient Unit",
        });
      }
    } else {
      res.status(200).json({
        status: "failed",
        message:
          "You can't make this action at the moment. Please try again later.",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
