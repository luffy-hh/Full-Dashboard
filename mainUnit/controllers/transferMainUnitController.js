const TransferMainUnit = require("../models/transferMainUnitModel");
const User = require("../../users/userModels");
const MainUnit = require("../../mainUnit/models/mainUnitModel");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

// Transfer Main Unit Admin And Other
exports.transferMainUnitfun = async (req, res) => {
  try {
    console.log("Hello World This is Transfer Function");
    const reqBodyObj = req.body;
    const currentMyanmarTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Admin Data

    const adminObj = await User.findById(req.user.id);
    const adminName = adminObj.name;

    // Admin Unit Data
    const mainUnitArr = await MainUnit.find();
    const mainUnitId = mainUnitArr[0]._id;
    const mainUnitObj = await MainUnit.findById(mainUnitId);
    const mainUnit = mainUnitObj.mainUnit;

    // User Data
    const userId = reqBodyObj.toId;
    const userObj = await User.findById(userId);
    const userName = userObj.name;
    const userUnit = userObj.unit;

    // Request Data

    const transferUnit = reqBodyObj.transferUnit;
    const status = reqBodyObj.status;
    const transferDate = moment(currentMyanmarTime).tz("Asia/Yangon").format();
    let afterUnitAmt = 0;

    if (status === "out") {
      afterUnitAmt = mainUnit - transferUnit;
      const mainUnitUpdate = await MainUnit.findByIdAndUpdate(
        mainUnitId,
        {
          mainUnit: afterUnitAmt,
        },
        { new: true }
      );
      const returnObjHistory = {
        transferAmt: transferUnit,
        beforeUnitAmt: Number(mainUnit),
        afterUnitAmt: afterUnitAmt,
        fromId: req.user.id,
        fromName: adminName,
        toId: userId,
        toName: userName,
        transferDate: transferDate,
        status: status,
      };
      const transferHistory = await TransferMainUnit.create(returnObjHistory);
      const userUnitUpdateVal = userUnit + transferUnit;
      const userUnitUpdate = await User.findByIdAndUpdate(
        userId,
        {
          unit: userUnitUpdateVal,
        },
        { new: true }
      );
      res.status(201).json({
        status: "success",
        data: {
          mainUnitUpdate,
          transferHistory,
          userUnitUpdate,
        },
      });
    }

    if (status === "in") {
      if (userUnit > transferUnit) {
        afterUnitAmt = mainUnit + transferUnit;
        const mainUnitUpdate = await MainUnit.findByIdAndUpdate(
          mainUnitId,
          {
            mainUnit: afterUnitAmt,
          },
          { new: true }
        );
        const returnObjHistory = {
          transferAmt: transferUnit,
          beforeUnitAmt: mainUnit,
          afterUnitAmt: afterUnitAmt,
          fromId: req.user.id,
          fromName: adminName,
          toId: userId,
          toName: userName,
          transferDate: transferDate,
          status: status,
        };
        const transferHistory = await TransferMainUnit.create(returnObjHistory);
        const userUnitUpdateVal = userUnit - transferUnit;
        const userUnitUpdate = await User.findByIdAndUpdate(
          userId,
          {
            unit: userUnitUpdateVal,
          },
          { new: true }
        );
        res.status(201).json({
          status: "success",
          data: {
            mainUnitUpdate,
            transferHistory,
            userUnitUpdate,
          },
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.stack,
    });
  }
};

exports.readMainUnitTransferHistory = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = TransferMainUnit.find(JSON.parse(queryStr));
    const mainUnitTransferHistory = await query;

    res.status(200).json({
      status: "success",
      length: mainUnitTransferHistory.length,
      data: {
        mainUnitTransferHistory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
