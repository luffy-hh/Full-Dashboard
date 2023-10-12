const TransferMainUnit = require("../models/transferMainUnitModel");
const User = require("../../users/userModels");
const MainUnit = require("../../mainUnit/models/mainUnitModel");

// Transfer Main Unit Admin And Other
exports.transferMainUnit = async (req, res) => {
  try {
    const adminId = "6527cb9f8d49230db6027fbb";
    const adminObj = await User.findById(adminId);
    const adminName = adminObj.name;
    const reqBodyObj = req.body;
    const unitObj = await MainUnit.find();
    const userId = reqBodyObj.toId;
    const userObj = await User.findById(userId);
    const userName = userObj.name;
    const userUnit = userObj.unit;
    const transferUnit = reqBodyObj.transferUnit;
    const beforeUnitAmt = unitObj.mainUnit;
    const status = reqBodyObj.status;
    const currentDate = new Date();
    let afterUnitAmt = 0;

    if (status === "out") {
      afterUnitAmt = beforeUnitAmt - transferUnit;
      const returnObj = {
        transferUnit: transferUnit,
        beforeUnitAmt: beforeUnitAmt,
        afterUnitAmt: afterUnitAmt,
        fromId: adminId,
        fromName: adminName,
        toId: userId,
        toName: userName,
        currentDate: currentDate,
        status: status,
      };
      res.status(201).json({
        status: "success",
        data: {
          returnObj,
        },
      });
    }

    if (status === "in") {
      afterUnitAmt = beforeUnitAmt + transferUnit;
      const returnObj = {
        transferUnit: transferUnit,
        beforeUnitAmt: beforeUnitAmt,
        afterUnitAmt: afterUnitAmt,
        toId: adminId,
        toName: adminName,
        fromId: userId,
        fromName: userName,
        currentDate: currentDate,
        status: status,
      };
      res.status(201).json({
        status: "success",
        data: {
          returnObj,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// exports.readMainUnitHistoryAll = async (req, res) => {
//   try {
//     const queryObj = { ...req.query };
//     const excludeFields = ["page", "sort", "limit", "fields"];
//     excludeFields.forEach((el) => delete queryObj[el]);

//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
//     console.log(JSON.parse(queryStr));

//     const query = MainUnitHistory.find(JSON.parse(queryStr));
//     const mainUnitHistories = await query;

//     res.status(200).json({
//       status: "success",
//       length: mainUnitHistories.length,
//       data: {
//         mainUnitHistories,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// };
