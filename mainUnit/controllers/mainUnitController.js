const MainUnit = require("../models/mainUnitModel");
const MainUnitHistory = require("../models/mainUnitHistoryModel");
const User = require("../../users/userModels");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

// Create Main Unit
exports.createMainUnit = async (req, res) => {
  try {
    const newUnitValue = await MainUnit.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUnitValue,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read Main Unit
exports.getMainUnitValue = async (req, res) => {
  try {
    const query = MainUnit.find();
    const mainUnitValue = await query;

    res.status(200).json({
      status: "Success",
      data: {
        mainUnitValue: mainUnitValue[0],
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Update or Increase / Decrease Main Unit
exports.updateMainUnit = async (req, res) => {
  try {
    const addUnitValue = req.body.mainUnit * 1;
    const mainUnitObj = await MainUnit.find();
    const orgMainUnitValue = mainUnitObj[0].mainUnit * 1;
    const status = req.body.status;

    let newMainUnit;

    if (status === "in") {
      newMainUnit = orgMainUnitValue + addUnitValue;
    } else if (status === "out") {
      newMainUnit = orgMainUnitValue - addUnitValue;
    } else {
      return;
    }

    const currentMyanmarTime = moment().format("YYYY-MM-DD HH:mm:ss");

    const mainUnitValue = await MainUnit.findByIdAndUpdate(
      mainUnitObj[0]._id,
      {
        mainUnit: newMainUnit,
      },
      { new: true }
    );

    //User Id and User Name
    const userName = req.user.name;

    const mainUnitHistoryObj = {
      userId: req.user.id,
      userName: userName,
      createDate: moment(currentMyanmarTime).tz("Asia/Yangon").format(),
      actionAmount: addUnitValue,
      newAmount: newMainUnit,
      status: status,
    };

    const formattedUnitCreateTime = moment(mainUnitHistoryObj.createDate)
      .tz("Asia/Yangon")
      .format();

    const mainUnitHistory = await MainUnitHistory.create(mainUnitHistoryObj);
    res.status(200).json({
      status: "Success",
      data: {
        mainUnitValue,
        mainUnitHistory,
        mainUnitHistory: {
          ...mainUnitHistory.toObject(),
          createDate: formattedUnitCreateTime,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
