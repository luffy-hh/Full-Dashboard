const MainUnit = require("../../mainUnit/models/mainUnitModel");
const GameSubCat = require("../../gameCategories/models/gameSubCatModels");
const lotterySetting = require("../../lotteryFilterSetting/models/lotteryFilterSettingModels");
const Thai3DNum = require("../../lottery_nuumbers/models/thai3DNumModels");
const User = require("../../users/userModels");
const Thai3DSale = require("../models/3dSaleModel");
const mongoose = require("mongoose");
const Thai3DSaleHistory = require("../models/3dSaleHistoriesModel");
const {createTransactionRecord} = require("../../transaction-record/transactionRecordController");
exports.create3DSaleDoc = async (req, res) => {
  try {
    const mainUnitArr = await MainUnit.find({});
    const mainUnitId = mainUnitArr[0]._id;
    const currentSubCat = await GameSubCat.findById(req.body.subCatId);
    const all3DNums = await Thai3DNum.find({});
    const selectedSetting = await lotterySetting.findOne({
      subCategoryId: currentSubCat._id,
    });
    const mainUnitObj = await MainUnit.findById(mainUnitId);
    const currentTime = new Date();
    console.log(selectedSetting.startDate, selectedSetting.endDate);
    const startDate = new Date(selectedSetting.startDate);
    // (new Date(selectedSetting.startDate))
    //   .tz("Asia/Yangon")
    //   .format();
    const endDate = new Date(selectedSetting.endDate);
    const user = await User.findById(req.user.id);
    if (
      startDate.getTime() <= currentTime.getTime() &&
      currentTime.getTime() < endDate.getTime()
    ) {
      const reqBody = req.body;
      // make an array for playableNumber
      const playedNumbers = reqBody.saleNumberArr.filter((sale) => {
        let curNum = all3DNums.find((num) => num.number === sale.number);
        return sale.amount <= curNum.lastAmount && sale;
      });

      // make an array for unplayableNumber
      const unPlayAbleNumbers = reqBody.saleNumberArr.filter((sale) => {
        let curNum = all3DNums.find((num) => num.number === sale.number);
        return sale.amount > curNum.lastAmount && sale;
      });

      const totalSaleAmount = playedNumbers
        .map((num) => num.amount)
        .reduce((acr, cur) => Number(acr) + Number(cur), 0);
      if (totalSaleAmount <= user.unit){
        for (const sale of playedNumbers) {
          let number = sale.number;
          let updatedDocument = await Thai3DNum.findOne({ number });
          const threeSaleObj = {
            subCatId: reqBody.subCatId,
            userId: user.id,
            number: number,
            amount: sale.amount,
          };
          const transactionObj ={
            user_id: user.id,
            before_amt: user.unit,
            action_amt: sale.amount,
            after_amt: user.unit - sale.amount,
            type: '3d-play',
            status: 'Out'
          }
          const newThai3DSale = new Thai3DSale({ ...obj });
          await Thai3DSaleHistory.create(threeSaleObj);
          // Save the new Thai3DSale document to the database
          await newThai3DSale.save();
          const newTransactionRecord = createTransactionRecord(transactionObj)

          // Calculate the total amount for this number
          const totalAmount = await Thai3DSale.aggregate([
            {
              $match: {
                number: number,
                subCatId: new mongoose.Types.ObjectId(reqBody.subCatId),
              },
            },
            {
              $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
              },
            },
          ]);

          const updated3DNum = await Thai3DNum.findOneAndUpdate(
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
            { new: true }
          );
        }
        const updatedMainUnit = await MainUnit.findByIdAndUpdate(mainUnitId, {
          $inc: { mainUnit: totalSaleAmount },
        });
        const updatedUser = await User.findByIdAndUpdate(user.id, {
          $inc: { unit: -totalSaleAmount },
        },{new: true});
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
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
